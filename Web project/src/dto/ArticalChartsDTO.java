package dto;

import java.util.ArrayList;

import enums.RestaurantType;

public class ArticalChartsDTO {
	    private int id;
		private String link;
		private String name;
		private int price;
		private int quantity;
		private int retaurantId;
		private RestaurantType restaurantType;
		private int articalInRestaurantId;
		
		public int getRetaurantId() {
			return retaurantId;
		}
		public void setRetaurantId(int retaurantId) {
			this.retaurantId = retaurantId;
		}
		public RestaurantType getRestaurantType() {
			return restaurantType;
		}
		public void setRestaurantType(RestaurantType restaurantType) {
			this.restaurantType = restaurantType;
		}
		public int getArticalInRestaurantId() {
			return articalInRestaurantId;
		}
		public void setArticalInRestaurantId(int articalInRestaurantId) {
			this.articalInRestaurantId = articalInRestaurantId;
		}
		
		
		public String getLink() {
			return link;
		}
		public void setLink(String link) {
			this.link = link;
		}
		public String getName() {
			return name;
		}
		public int getId() {
			return id;
		}
		public void setId(int id) {
			this.id = id;
		}
		public void setName(String name) {
			this.name = name;
		}
		public int getPrice() {
			return price;
		}
		public void setPrice(int price) {
			this.price = price;
		}
		public int getQuantity() {
			return quantity;
		}
		
		public void setQuantity(int quantity) {
			this.quantity = quantity;
		}
		
		public ArticalChartsDTO() {
			super();
		}
		public ArticalChartsDTO(int id, String link, String name, int price, int quantity, int retaurantId,
				RestaurantType restaurantType, int articalInRestaurantId) {
			super();
			this.id = id;
			this.link = link;
			this.name = name;
			this.price = price;
			this.quantity = quantity;
			this.retaurantId = retaurantId;
			this.restaurantType = restaurantType;
			this.articalInRestaurantId = articalInRestaurantId;
		}
		
		
		
	   
}
