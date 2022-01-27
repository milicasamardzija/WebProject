package beans;

import enums.CustomerType;

public class Customer {
	public CustomerType type;
	private double sale;
	
	public Customer() {}
	
	public Customer(CustomerType type, double sale) {
		super();
		this.type = type;
		this.sale = sale;
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

	@Override
	public String toString() {
		return "Customer [type=" + type + ", sale=" + sale +"]" ;
	}

	 
}
