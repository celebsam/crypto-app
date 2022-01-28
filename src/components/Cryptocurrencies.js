import React, { useEffect, useState } from "react";
import millify from "millify";
import { Link } from "react-router-dom";

import { useGetCryptosQuery } from "../services/cryptoApi";
import { Card, Col, Input, Row } from "antd";

const Cryptocurrencies = ({ simplified }) => {
  const count = simplified ? 10 : 100;
  const { data: cryptosList, isFetching } = useGetCryptosQuery(count);
  const [cryptos, setCryptos] = useState(cryptosList?.data?.coins);
  const [searchTerm, setSearchTerm] = useState("");
  console.log(cryptos);

  useEffect(() => {
    const filteredCoin = cryptosList?.data?.coins?.filter((crypto) =>
      crypto.name.toLowerCase().includes(searchTerm.toLocaleLowerCase())
    );
    setCryptos(filteredCoin);
  }, [searchTerm, cryptosList]);

  if (isFetching) {
    return <h3>Loading...</h3>;
  }
  return (
    <>
      {simplified ? null : (
        <div className="search-crypto">
          <Input
            placeholder="Search Coin"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      )}

      <Row gutter={[32, 32]} className="crypto-card-container">
        {cryptos?.map((crypto) => (
          <Col xs={24} sm={12} lg={6} className="crypto-card" key={crypto.id}>
            <Link to={`/crypto/${crypto.id}`}>
              <Card
                title={`${crypto.rank}. ${crypto.name}`}
                extra={
                  <img
                    className="crypto-image"
                    src={crypto.iconUrl}
                    alt="coin icon"
                  />
                }
                hoverable
              >
                <p>Price: {millify(crypto.price)}</p>
                <p>Market Cap: {millify(crypto.marketCap)}</p>
                <p>Daily Change: {millify(crypto.change)}%</p>
              </Card>
            </Link>
          </Col>
        ))}
      </Row>
    </>
  );
};

export default Cryptocurrencies;
