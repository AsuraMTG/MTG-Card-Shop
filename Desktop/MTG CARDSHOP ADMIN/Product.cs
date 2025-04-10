﻿namespace MTG_CARDSHOP_ADMIN
{
    using System;
    using System.Collections.Generic;

    using System.Globalization;
    using MySqlX.XDevAPI;
    using System.Net.Http;
    using Newtonsoft.Json;
    using Newtonsoft.Json.Converters;

    public partial class Product
    {
        [JsonProperty("product_id")]
        public long ProductId { get; set; }

        [JsonProperty("name")]
        public string Name { get; set; }

        [JsonProperty("category_id")]
        public long CategoryId { get; set; }

        [JsonProperty("price")]
        public string Price { get; set; }

        [JsonProperty("stock_quantity")]
        public long StockQuantity { get; set; }

        [JsonProperty("available")]
        public long Available { get; set; }

        [JsonProperty("description")]
        public string Description { get; set; }

        [JsonProperty("imageUrl")]
        public string ImageUrl { get; set; }
    }

    public partial class Product
    {
        public static List<Product> FromJson(string json) => JsonConvert.DeserializeObject<List<Product>>(json, MTG_CARDSHOP_ADMIN.ProductConverter.Settings);
    }

    public static class ProductSerialize
    {
        public static string ToJson(this List<Product> self) => JsonConvert.SerializeObject(self, MTG_CARDSHOP_ADMIN.ProductConverter.Settings);
    }

    internal static class ProductConverter
    {
        public static readonly JsonSerializerSettings Settings = new JsonSerializerSettings
        {
            MetadataPropertyHandling = MetadataPropertyHandling.Ignore,
            DateParseHandling = DateParseHandling.None,
            Converters =
            {
                new IsoDateTimeConverter { DateTimeStyles = DateTimeStyles.AssumeUniversal }
            },
        };
    }
}