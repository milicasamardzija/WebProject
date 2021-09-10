package beans;

public class ArticalChart {
	private int idArtical;
	private int quantity;
	private int idCustomer;
	
	
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
	public int getIdCustomer() {
		return idCustomer;
	}
	public void setIdCustomer(int idCustomer) {
		this.idCustomer = idCustomer;
	}
	public ArticalChart(int idArtical, int quantity, int idCustomer) {
		super();
		this.idArtical = idArtical;
		this.quantity = quantity;
		this.idCustomer = idCustomer;
	}
	public ArticalChart() {
		super();
	}
	
	
	
}
