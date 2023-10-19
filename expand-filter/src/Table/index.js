import { Space, Switch, Table, Input } from 'antd';
import { useState } from 'react';
import { tableData } from './constantFile';


const ExpandableTable = () => {
    const [checkStrictly, setCheckStrictly] = useState(false);
    const [searchText, setSearchText] = useState('');
  
const columns = [
    {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
        render: (text) => {
          const matchIndex = text.toLowerCase().indexOf(searchText.toLowerCase());
          if (matchIndex >= 0) {
            const beforeStr = text.substr(0, matchIndex);
            const matchStr = text.substr(matchIndex, searchText.length);
            const afterStr = text.substr(matchIndex + searchText.length);
            return (
              <span>
                {beforeStr}
                <span style={{ backgroundColor: 'yellow' }}>{matchStr}</span>
                {afterStr}
              </span>
            );
          }
          return text;
        },
      },
      
  {
    title: 'Age',
    dataIndex: 'age',
    key: 'age',
    width: '12%',
  },
  {
    title: 'Address',
    dataIndex: 'address',
    width: '30%',
    key: 'address',
  },
];


const filteredData = tableData.filter((record) =>
  Object.values(record).some((value) => value.toString().toLowerCase().includes(searchText.toLowerCase()))
);


  return (
    <>
      <Space align="center" style={{ marginBottom: 16 }}>
  CheckStrictly: <Switch checked={checkStrictly} onChange={setCheckStrictly} />
  <Input placeholder="Search" value={searchText} onChange={(e) => setSearchText(e.target.value)} />
</Space>

<Table
  columns={columns}
  rowSelection={{
    ...rowSelection,
    checkStrictly,
  }}
  dataSource={filteredData}
/>
    </>
  );
};
export default ExpandableTable;