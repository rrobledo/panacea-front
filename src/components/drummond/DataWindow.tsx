import DataSource from "./datasources/DataSource";
import React, { useState, useEffect } from "react";

type Props = {
  dataSource: DataSource;
};

const DataWindow = ({ dataSource }: Props) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        let result: any = await dataSource.retrieve("");
        console.log("data");
        console.log(result);
        setData(result.data);
        setLoading(false);
      } catch (error: any) {
        setError(error);
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  return (
    <div>
      <ul>
        {data.map((item: { code: string; name: string }) => (
          <li key={item.code}>{item.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default DataWindow;
