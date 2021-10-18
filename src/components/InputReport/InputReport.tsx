import {Tab} from "@material-ui/core";
import {useState} from "react";
import {TabContext, TabList, TabPanel} from "@material-ui/lab";
import "./InputReport.sass";
import {CATEGORIES} from "../../Strings";

export default function InputReport() {
    const [tabPosition, setTabPosition] = useState("0");

    return (
        <div className={"input-report-tab-list"}>
          <TabContext value={tabPosition}>
              <TabList centered onChange={(_, value) => setTabPosition(value)}>
                  {CATEGORIES.map((value) => (
                      <Tab label={value} value={value}/>
                  ))}
              </TabList>
              {CATEGORIES.map((value) => (
                  <TabPanel value={value}>
                      {value}
                  </TabPanel>
              ))}
          </TabContext>
        </div>
    );
}