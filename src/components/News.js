import { Card, Col, Row, Select, Typography } from "antd";
import React from "react";
import altImage from "../images/PngItem_4679051.png";

import { useGetCryptoNewsQuery } from "../services/cryptoNewsApi";

const { Text, Title } = Typography;
const { Option } = Select;
const News = ({ simplified }) => {
  const { data: cryptoNews, isFetching } = useGetCryptoNewsQuery({
    newsCategory: "Cryptocurrency",
    count: simplified ? 6 : 12,
  });
  console.log(cryptoNews);
  if (isFetching) {
    return <h3>loading...</h3>;
  }

  return (
    <Row gutter={[24, 24]}>
      {cryptoNews?.value?.map((news, i) => (
        <Col xs={24} sm={12} lg={8} key={i}>
          <Card hoverable className="news-card">
            <a href={news.url} target="_blank" rel="noreferrer">
              <div className="news-image-container">
                <Title className="news-title" level={4}>
                  {news.name}
                </Title>
                <img
                  src={news.image.thumbnail.contentUrl || altImage}
                  alt="crypto news"
                />
              </div>
              <p>
                {news.description.length > 200
                  ? `${news.description.substring(0, 200)}...`
                  : news.description}
              </p>
            </a>
          </Card>
        </Col>
      ))}
    </Row>
  );
};

export default News;
