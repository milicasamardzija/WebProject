package dto;

public class CommentNewDTO {
	public int id;
	public int idRestaurant;
	public String username;
	public String text;
	public double grade;
	
	public CommentNewDTO() {}
	
	public CommentNewDTO(int id, int idRestaurant, String username, String text, double grade) {
		super();
		this.id = id;
		this.idRestaurant = idRestaurant;
		this.username = username;
		this.text = text;
		this.grade = grade;
	}

	

}
