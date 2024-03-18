import { Paper } from "@mui/material";
import NavBar from "./NavBar/NavBar";
import Tablee from "./Table/Tablee";

export default function Home() {
    return (<>
        <NavBar />
        <Paper className="m-20" elevation={24}>
            <Tablee />
        </Paper>
    </>)
}