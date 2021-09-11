package dto;

import java.util.ArrayList;

public class ArticalChartsDTO {
		private String link;
		private String name;
		private int price;
		private int quantity;
		
		public String getLink() {
			return link;
		}
		public void setLink(String link) {
			this.link = link;
		}
		public String getName() {
			return name;
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
		public ArticalChartsDTO(String link,String name, int price, int quantity) {
			super();
			this.link = link;
			this.name = name;
			this.price = price;
			this.quantity = quantity;
		}
		public ArticalChartsDTO() {
			super();
		}
		public ArrayList<ArticalChartsDTO> getArticalsForChart() {
			// TODO Auto-generated method stub
			return null;
		}
	   
}
