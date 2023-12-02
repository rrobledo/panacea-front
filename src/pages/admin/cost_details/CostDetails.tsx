import React from "react";
import DataWindow from "../../../components/drummond/DataWindow";
import DataSourceHttp from "../../../components/drummond/datasources/DataSourceHttp";

type Props = {};

const CostDetailsPage = (props: Props) => {
  let ds = new DataSourceHttp();
  return (
    <div>
      <DataWindow dataSource={ds}></DataWindow>
    </div>
  );
};

export default CostDetailsPage;
