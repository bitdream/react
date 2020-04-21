import React from "react";
import { NavLink as Link} from 'react-router-dom'


class Tab extends React.Component {
    constructor(pros) {
        super(pros);
    }

    render() {
        return(
        <nav >
            <Link to='/'>[Home]</Link>
            <Link to='calc'>[Calculator]</Link>
            <Link to='pixel'>[Pixel]</Link>

        </nav>
        );
    }

}

export default Tab;
