package dto;

public class CommentDTO {
	public int id;
	public String restaurantName;
	public String username;
	public String text;
	public double grade;
	public boolean approved;
	
	public CommentDTO(int id, String restaurantName, String username, String text, double grade) {
		super();
		this.id = id;
		this.restaurantName = restaurantName;
		this.username = username;
		this.text = text;
		this.grade = grade;
	}
	
	public CommentDTO(int id, String restaurantName, String username, String text, double grade, boolean approved) {
		super();
		this.id = id;
		this.restaurantName = restaurantName;
		this.username = username;
		this.text = text;
		this.grade = grade;
		this.approved = approved;
	}
}
