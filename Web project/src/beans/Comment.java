package beans;

public class Comment {
	private int id;
	private String customerId;
	private int restaurantId;
	private String text;
	private double grade;
	private Boolean approved;
	
	public Comment() {};

	
	public Boolean getApproved() {
		return approved;
	}



	public void setApproved(Boolean approved) {
		this.approved = approved;
	}



	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getCustomerId() {
		return customerId;
	}
	public void setCustomerId(String customerId) {
		this.customerId = customerId;
	}
	public int getRestaurantId() {
		return restaurantId;
	}
	public void setRestaurantId(int restaurantId) {
		this.restaurantId = restaurantId;
	}
	public String getText() {
		return text;
	}
	public void setText(String text) {
		this.text = text;
	}
	public double getGrade() {
		return grade;
	}
	public void setGrade(double grade) {
		this.grade = grade;
	}
	public Comment(int id, String customerId, int restaurantId, String text, double grade, Boolean approved) {
		super();
		this.id = id;
		this.customerId = customerId;
		this.restaurantId = restaurantId;
		this.text = text;
		this.grade = grade;
		this.approved = approved;
	}
	
	
}
