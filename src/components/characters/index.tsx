import { useEffect, useState } from "react";

import { Api } from "../../services/api/axios-config";

import { Table, Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";

import "antd/dist/antd.css";

const Characters: React.FC = () => {
  const [loading, setLoading] = useState(false);

  const [page, setPage] = useState(1);

  const [pageSize, setPageSize] = useState(10);

  const [characters, setCharacters] = useState([]);

  const columns = [
    {
      key: "1",
      title: "Nome",
      dataIndex: "name",
      filterDropdown: ({
        setSelectedKeys, selectedKeys, confirm
      }) => {
        return (
          <div>
            <Input autoFocus placeholder="Pesquise pelo nome"
            onPressEnter={() => {
              confirm();
            }}
            onBlur={() => {
              confirm();
            }}
            onChange={(e) => {
              setSelectedKeys(e.target.value ? [e.target.value] : []);
            }}
            value={selectedKeys[0]}
            ></Input>
          </div>
        );
      },
      filterIcon: () => {
        return <SearchOutlined />;
      },
      onFilter:(value, record) => {
        return record.name.toLowerCase().includes(value.toLowerCase());
      }
    },
    {
      key: "2",
      title: "Gênero",
      dataIndex: "gender",
      filters: [
        { text: "male", value: "male" },
        { text: "female", value: "female" },
        { text: "n/a", value: "n/a" },
      ],
      onFilter: (value, record) => {
        return record.gender === value;
      },
    },
    {
      key: "3",
      title: "Altura",
      dataIndex: "height",
      sorter: (alturaAsc, alturaDes) => {
        return alturaAsc.height > alturaDes.height;
      },
    },
    {
      key: "4",
      title: "Peso",
      dataIndex: "mass",
      sorter: (pesoAsc, pesoDes) => {
        return pesoAsc.mass > pesoDes.mass;
      },
    },
  ];

  useEffect(() => {
    setLoading(true);

    Api.get(`/people/`)
      .then((response) => {
        setCharacters(response.data.results);
      })
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div>
      <Table
        loading={loading}
        columns={columns}
        dataSource={characters}
        pagination={{
          current: page,
          pageSize: pageSize,
          total: characters.length,
          showQuickJumper: true,
          onChange: (page, pageSize) => {
            setPage(page);
            setPageSize(pageSize);
          },
        }}
      />
    </div>
  );
};

export default Characters;
