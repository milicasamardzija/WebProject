package beans;

import java.util.ArrayList;

public class Chart {
	private int id;
	private ArrayList<Integer> articalsIds;
	private String idCustomer;
		private double price;
		
	public Chart() {}	
	
	public Chart(int id, ArrayList<Integer> articalsIds, String idCustomer, double price) {
		super();
		this.id = id;
		this.articalsIds = articalsIds;
		this.idCustomer = idCustomer;
		this.price = price;
	}
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public ArrayList<Integer> getArticalsIds() {
		return articalsIds;
	}
	public void setArticalsIds(ArrayList<Integer> articalsIds) {
		this.articalsIds = articalsIds;
	}
	public String getIdCustomer() {
		return idCustomer;
	}
	public void setIdCustomer(String idCustomer) {
		this.idCustomer = idCustomer;
	}
	public double getPrice() {
		return price;
	}
	public void setPrice(double price) {
		this.price = price;
	}

}
