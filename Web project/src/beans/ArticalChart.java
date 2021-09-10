package beans;

public class ArticalChart {
	private int id;
	private int idArtical;
	private int quantity;
	private String idCustomer;
	
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
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
	public ArticalChart(int id,int idArtical, int quantity, String idCustomer) {
		super();
		this.id = id;
		this.idArtical = idArtical;
		this.quantity = quantity;
		this.idCustomer = idCustomer;
	}
	public ArticalChart() {
		super();
	}
	
	
	
}
