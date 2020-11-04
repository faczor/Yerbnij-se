package com.yerbnijse.scraper.model;

import static com.yerbnijse.scraper.utils.ObjectMapper.stringToAmount;
import static com.yerbnijse.scraper.utils.ObjectMapper.stringToPrice;

public class ResultData {
    String domainName;
    String productName;
    Integer productAmount;
    Double productPrice;
    String productImage;

    private ResultData(Builder builder) {
        this.domainName = builder.domainName;
        this.productName = builder.productName;
        this.productAmount = builder.productAmount;
        this.productPrice = builder.productPrice;
        this.productImage = builder.productImage;
    }

    public static class Builder {
        private String domainName;
        private String productName;
        private Integer productAmount;
        private Double productPrice;
        private String productImage;

        public Builder domainName(String value) {
            domainName = value;
            return this;
        }

        public Builder productName(String value) {
            productName = value;
            return this;
        }

        public Builder productAmount(String value) {
            productAmount = stringToAmount(value);
            return this;
        }

        public Builder productPrice(String value) {
            productPrice = stringToPrice(value);
            return this;
        }

        public Builder productImage(String value) {
            productImage = value;
            return this;
        }

        public ResultData build() {
            return new ResultData(this);
        }
    }
}
