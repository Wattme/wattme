import { createTheme } from '@mui/material/styles';

import components from './overrides';
import {
    palette,
    typography
} from "./common";

const theme = createTheme({
    palette,
    typography,

    components,
});

export default theme;
