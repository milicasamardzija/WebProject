package beans;

import enums.CustomerType;

public class Customer {
	private CustomerType type;
	private double sale;
	private double points;
	
	public Customer() {}
	
	public Customer(CustomerType type, double sale, double points) {
		super();
		this.type = type;
		this.sale = sale;
		this.points = points;
	}

	public CustomerType getType() {
		return type;
	}

	public void setType(CustomerType type) {
		this.type = type;
	}

	public double getSale() {
		return sale;
	}

	public void setSale(double sale) {
		this.sale = sale;
	}

	public double getPoints() {
		return points;
	}

	public void setPoints(double points) {
		this.points = points;
	} 
}
