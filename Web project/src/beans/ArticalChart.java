package beans;

import enums.RestaurantType;

public class ArticalChart {
	private int idArtical;
	private int quantity;
	private String idCustomer;
	private int idArticalInRestaurant;
	private int idRestaurant;
	private RestaurantType restaurantType;
	
	public int getIdArticalInRestaurant() {
		return idArticalInRestaurant;
	}
	public void setIdArticalInRestaurant(int idArticalInRestaurant) {
		this.idArticalInRestaurant = idArticalInRestaurant;
	}
	public int getIdRestaurant() {
		return idRestaurant;
	}
	public void setIdRestaurant(int idRestaurant) {
		this.idRestaurant = idRestaurant;
	}
	public RestaurantType getRestaurantType() {
		return restaurantType;
	}
	public void setRestaurantType(RestaurantType restaurantType) {
		this.restaurantType = restaurantType;
	}
	
	public int getIdArtical() {
		return idArtical;
	}
	public void setIdArtical(int idArtical) {
		this.idArtical = idArtical;
	}
	public int getQuantity() {
		return quantity;
	}
	public void setQuantity(int quantity) {
		this.quantity = quantity;
	}
	public String getIdCustomer() {
		return idCustomer;
	}
	public void setIdCustomer(String idCustomer) {
		this.idCustomer = idCustomer;
	}
	
	public ArticalChart(int idArtical, int quantity, String idCustomer, int idArticalInRestaurant, int idRestaurant,
			RestaurantType restaurantType) {
		super();
		this.idArtical = idArtical;
		this.quantity = quantity;
		this.idCustomer = idCustomer;
		this.idArticalInRestaurant = idArticalInRestaurant;
		this.idRestaurant = idRestaurant;
		this.restaurantType = restaurantType;
	}
	public ArticalChart() {
		super();
	}
	
	
	
}
