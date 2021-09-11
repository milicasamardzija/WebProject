package beans;

import enums.ArticalType;

public class Artical {
	private int id;
	private String name;
	private int price;
	private ArticalType type;
	private int idRestaurant;
	private double quantity;
	private String description;
	private String link;
	private boolean deleted;
	private int number;
	
	public int getNumber() {
		return number;
	}
	public void setNumber(int number) {
		this.number = number;
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
	public ArticalType getType() {
		return type;
	}
	public void setType(ArticalType type) {
		this.type = type;
	}
	public int getIdRestaurant() {
		return idRestaurant;
	}
	public void setIdRestaurant(int idRestaurant) {
		this.idRestaurant = idRestaurant;
	}
	public double getQuantity() {
		return quantity;
	}
	public void setQuantity(double quantity) {
		this.quantity = quantity;
	}
	public String getDescription() {
		return description;
	}
	public void setDescription(String description) {
		this.description = description;
	}
	public String getLink() {
		return link;
	}
	public void setLink(String link) {
		this.link = link;
	}
	
	public Artical(int id, String name, int price, ArticalType type, int idRestaurant, double quantity,
			String description, String link, boolean deleted, int number) {
		super();
		this.id = id;
		this.name = name;
		this.price = price;
		this.type = type;
		this.idRestaurant = idRestaurant;
		this.quantity = quantity;
		this.description = description;
		this.link = link;
		this.deleted = deleted;
		this.number=number;
	}
	
	public Artical() {
		
	}
	
}
