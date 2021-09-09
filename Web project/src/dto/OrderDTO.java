package dto;

import java.util.ArrayList;
import java.util.Date;
import enums.OrderStatus;
import enums.RestaurantType;

public class OrderDTO {


	public Integer id; 
	public ArrayList<String> artikli;
	public String restaurantName;
	public Date date;
	public int price;
	public String idCustomer;
	public OrderStatus status;
	public Boolean deleted;
	public String idDeliverer;
	public RestaurantType restaurantType;
	
	public RestaurantType getRestaurantType() {
		return restaurantType;
	}
	public void setRestaurantType(RestaurantType restaurantType) {
		this.restaurantType = restaurantType;
	}
	public String getIdDeliverer() {
		return idDeliverer;
	}
	public void setIdDeliverer(String idDeliverer) {
		this.idDeliverer = idDeliverer;
	}
	public Boolean getDeleted() {
		return deleted;
	}
	public void setDeleted(Boolean deleted) {
		this.deleted = deleted;
	}
	public void setId(Integer id) {
		this.id = id;
	}
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public ArrayList<String> getArtikli() {
		return artikli;
	}
	public void setArtikli(ArrayList<String> artikli) {
		this.artikli = artikli;
	}
	public String getRestaurantName() {
		return restaurantName;
	}
	public void setRestaurantName(String restaurantName) {
		this.restaurantName = restaurantName;
	}
	public Date getDate() {
		return date;
	}
	public void setDate(Date date) {
		this.date = date;
	}
	public int getPrice() {
		return price;
	}
	public void setPrice(int price) {
		this.price = price;
	}
	public String getIdCustomer() {
		return idCustomer;
	}
	public void setIdCustomer(String idCustomer) {
		this.idCustomer = idCustomer;
	}
	public OrderStatus getStatus() {
		return status;
	}
	public void setStatus(OrderStatus status) {
		this.status = status;
	}
	public OrderDTO(Integer id, ArrayList<String> artikli, String restaurantName, Date date, int price,
			String idCustomer, OrderStatus status, Boolean deleted, String idDeliverer, RestaurantType
			type) {
		super();
		this.id = id;
		this.artikli = artikli;
		this.restaurantName = restaurantName;
		this.date = date;
		this.price = price;
		this.idCustomer = idCustomer;
		this.status = status;
		this.deleted = deleted;
		this.idDeliverer=idDeliverer;
		this.restaurantType= type;
	}


}
