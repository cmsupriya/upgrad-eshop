import Grid from "@mui/material/Grid";
import { useContext } from "react";
import Box from "@mui/material/Box";
import useAuth from "../../common/hooks/useAuth";
import ProductCategory from "../productCategory/ProductCategory";
import ProductList from "../productList/ProductList";
import {FormControl, InputLabel, Select} from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import {useState} from "react";
import {setSortBy} from "../../common/store/actions/metadataAction";
import {connect} from "react-redux";

const Home = ({selectedSortBy, saveSortBy}) => {
	const { AuthCtx } = useAuth();
	const { hasRole } = useContext(AuthCtx);
	const [sortBy, setSortBy] = useState(selectedSortBy);

	let mode = (hasRole(["ADMIN"])) ? "EDIT" : "VIEW";

	const handleChange = (event) => {
		setSortBy(event.target.value);
		saveSortBy(event.target.value);
	};

	const options = [
		{
			label: "Default",
			value: "DEFAULT",
		},
		{
			label: "Price high to low",
			value: "PRICE_DESC",
		},
		{
			label: "Price low to high",
			value: "PRICE_ASC",
		},
		{
			label: "Newest",
			value: "NEWEST",
		},
	];

	return (
		<Box sx={{ flexGrow: 1 }}>
			<Grid container spacing={1}>
				<Grid container item spacing={3}>
					<Grid item xs={12}>
						<div style={{ display: 'flex', justifyContent: 'center' }}>
							<ProductCategory />
						</div>
					</Grid>
					<Grid item xs={12}>
						<div style={{ display: 'flex', justifyContent: 'left', paddingLeft: "1%" }}>
							<FormControl sx={{ m: 1, minWidth: 240 }} size={"small"}>
								<InputLabel id="demo-simple-select-label">Sort By</InputLabel>
								<Select
									labelId="demo-simple-select-label"
									id="demo-simple-select"
									value={sortBy}
									label="Sort By"
									onChange={handleChange}
								>
									{options.map((element, index) => {
										return (
											<MenuItem
												key={"sortBy_" + index}
												value={element.value}
											>
												{element.label}
											</MenuItem>
										);
									})}
								</Select>
							</FormControl>
						</div>
					</Grid>
					<ProductList mode={mode} />
				</Grid>
			</Grid>
		</Box>
	);
};

const mapStateToProps = (state) => {
	return {
		selectedSortBy: state.metadata.selectedSortBy,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		saveSortBy: (sortBy) => dispatch(setSortBy(sortBy)),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);