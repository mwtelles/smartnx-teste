import { useEffect, useState } from "react";

import { Api } from "../../services/api/axios-config";

import { Table } from "antd";

import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'

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
    },
    {
      key: "2",
      title: "Gênero",
      dataIndex: "gender",
      filters:[
        {text: 'male', value:'male'},
        {text: 'female', value:'female'},
        {text: 'n/a', value:'n/a'},
      ],
      onFilter: (value, record) => {
        return record.gender === value
      }
    },
    {
      key: "3",
      title: "Altura",
      dataIndex: "height",
      sorter:(alturaAsc, alturaDes) => {
        return alturaAsc.height > alturaDes.height
      }
    },
    {
      key: "4",
      title: "Peso",
      dataIndex: "mass",
      sorter:(pesoAsc, pesoDes) => {
        return pesoAsc.mass > pesoDes.mass
      }
    },
  ]

  useEffect(() => {

    setLoading(true);

    Api.get(`/people/`)
      .then(response => {
        setCharacters(response.data.results);
      })
      .catch((err) => console.log(err))
      .finally(() => setLoading(false))
  }, []);


  return (
    <div>
      <Table
      loading={loading}
      columns={columns}
      dataSource={characters}
      pagination={{
        current:page,
        pageSize: pageSize,
        total: characters.length,
        showQuickJumper: true,
        onChange: (page, pageSize) => {
          setPage(page);
          setPageSize(pageSize);
        }

      }}
      />
    </div>
  );
};

export default Characters;


