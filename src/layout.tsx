import React from 'react';
import './layout.css';
import { Resizable } from 're-resizable';

type LayoutProps = {
    sidebarArea: React.ReactNode;
    preview: React.ReactNode;
}

// Custom handle
const Handle = () => {
    return (
        <div className="resizable-handle" />
    );
};

const Layout: React.FC<LayoutProps> = ({ sidebarArea, preview }) => {
    return (

        <div className="layout">

            <Resizable
                defaultSize={{
                    width: 360,
                    height: '100%',
                }}
                minHeight={"100%"}
                maxHeight={"100%"}
                minWidth={280}
                maxWidth={560}
                className="left-panel"
                handleComponent={{ right: <Handle /> }}
                enable={{
                    top: false,
                    right: true,
                    bottom: false,
                    left: false,
                    topRight: false,
                    bottomRight: false,
                    bottomLeft: false,
                    topLeft: false
                }}
            >
                {sidebarArea}
            </Resizable>

            <div className="preview-area">
                {preview}
            </div>
        </div>
    );
};

export default Layout;
