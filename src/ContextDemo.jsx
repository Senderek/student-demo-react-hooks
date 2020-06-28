import React, { createContext, forwardRef, useCallback, useContext, useState, useEffect } from "react";
import { createPortal } from "react-dom";
import useForwardedRef from "@bedrock-layout/use-forwarded-ref";
// import "./styles.css";

const tabListElementContext = createContext();
const selectedPanelContext = createContext();
const setSelectedPanelContext = createContext();

const Tabs = ({ children, initialPanelRef = null }) => {
    const [tabListElement, setTabListElement] = useState(null);
    const [selectedPanel, setSelectedPanel] = useState(initialPanelRef);

    useEffect(() => setSelectedPanel(initialPanelRef), [setSelectedPanel, initialPanelRef]);

    return (
        <div className="tabs">
            <ul className="tab-list" ref={setTabListElement} />
            <tabListElementContext.Provider value={tabListElement}>
                <setSelectedPanelContext.Provider value={setSelectedPanel}>
                    <selectedPanelContext.Provider value={selectedPanel}>{tabListElement ? children : null}</selectedPanelContext.Provider>
                </setSelectedPanelContext.Provider>
            </tabListElementContext.Provider>
        </div>
    );
};

const panelContext = createContext();

const Panel = forwardRef(({ children }, ref) => {
    const panelRef = useForwardedRef(ref);

    if (!panelRef.current) {
        panelRef.current = {};
    }

    return <panelContext.Provider value={panelRef.current}>{children}</panelContext.Provider>;
});

const Tab = ({ children }) => {
    const tabListElement = useContext(tabListElementContext);
    const setSelectedPanel = useContext(setSelectedPanelContext);
    const selectedPanel = useContext(selectedPanelContext);
    const panel = useContext(panelContext);

    const handleClick = useCallback(() => setSelectedPanel(panel), [setSelectedPanel, panel]);

    const classNames = ["tab"];

    if (selectedPanel === panel) {
        classNames.push("active");
    }

    return createPortal(
        <li className={classNames.join(" ")}>
            <button onClick={handleClick}>{children}</button>
        </li>,
        tabListElement
    );
};

const Content = ({ children }) => {
    const selectedPanel = useContext(selectedPanelContext);
    const panel = useContext(panelContext);

    return selectedPanel === panel ? <div className="content">{children}</div> : null;
};

const ContextDemo = () => {
    const [firstPanelRef, setFirstPanelRef] = useState();

    return (
        <div className="ContextDemo">
            <Tabs initialPanelRef={firstPanelRef}>
                <Panel ref={setFirstPanelRef}>
                    <Tab>Panel 1</Tab>
                    <Content>Panel 1 content</Content>
                </Panel>
                <Panel>
                    <Tab>Panel 2</Tab>
                    <Content>Panel 2 content</Content>
                </Panel>
            </Tabs>
        </div>
    );
};

export default ContextDemo;
