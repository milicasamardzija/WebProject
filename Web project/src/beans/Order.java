package beans;

import java.util.ArrayList;
import java.util.Date;


import enums.OrderStatus;

public class Order {
	private int id; // karaktera
	private ArrayList<Integer> articalIds; // ArticalChart!!
	private int retaurantId;
	private Date date; //datum i vreme
	private double price;
	private String idCustomer;
	private OrderStatus status;
	private Boolean deleted;
	private String idDeliverer; 
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
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public ArrayList<Integer> getArticalIds() {
		return articalIds;
	}
	public void setArticalIds(ArrayList<Integer> articalIds) {
		this.articalIds = articalIds;
	}
	public int getRetaurantId() {
		return retaurantId;
	}
	public void setRetaurantId(int retaurantId) {
		this.retaurantId = retaurantId;
	}
	public Date getDate() {
		return date;
	}
	public void setDate(Date date) {
		this.date = date;
	}
	public double getPrice() {
		return price;
	}
	public void setPrice(double price) {
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
	public Order(int id, ArrayList<Integer> articalIds, int retaurantId, Date date, double price, String idCustomer,
			OrderStatus status, Boolean deleted, String idD) {
		super();
		this.id = id;
		this.articalIds = articalIds;
		this.retaurantId = retaurantId;
		this.date = date;
		this.price = price;
		this.idCustomer = idCustomer;
		this.status = status;
		this.deleted=deleted;
		this.idDeliverer=idD;
	}
	public Order() {
		super();
	}
}
