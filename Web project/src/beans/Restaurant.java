package beans;

import java.util.ArrayList;

import enums.RestaurantType;
import enums.Status;

public class Restaurant {
	private int id;
	private String managerId;
	private String name;
	private RestaurantType type;
	private ArrayList<Integer> articalIds;
	private Status status;
	private Address address;
	private String link;
	private Boolean deleted;
	private double grade;
	
	
	public double getGrade() {
		return grade;
	}

	public void setGrade(double grade) {
		this.grade = grade;
	}

	public Boolean getDeleted() {
		return deleted;
	}

	public void setDeleted(Boolean deleted) {
		this.deleted = deleted;
	}

	public Restaurant() {};
	
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
	public RestaurantType getType() {
		return type;
	}
	public void setType(RestaurantType type) {
		this.type = type;
	}
	public ArrayList<Integer> getArticalIds() {
		return articalIds;
	}
	public void setArticalIds(ArrayList<Integer> articalIds) {
		this.articalIds = articalIds;
	}
	public Status getStatus() {
		return status;
	}
	public void setStatus(Status status) {
		this.status = status;
	}
	public Address getAddress() {
		return address;
	}
	public void setAddress(Address address) {
		this.address = address;
	}
	public String getLink() {
		return link;
	}
	public void setLink(String link) {
		this.link = link;
	}
	
	public String getManagerId() {
		return managerId;
	}

	public void setManagerId(String managerId) {
		this.managerId = managerId;
	}

	public Restaurant(int id,String managerId, String name, RestaurantType type, ArrayList<Integer> articalIds, Status status,
			Address address, String link, Boolean deleted, double grade) {
		super();
		this.id = id;
		this.managerId = managerId;
		this.name = name;
		this.type = type;
		this.articalIds = articalIds;
		this.status = status;
		this.address = address;
		this.link = link;
		this.deleted= deleted;
		this.grade = grade;
	}

	@Override
	public String toString() {
		return "Restaurant [id=" + id + ", managerId=" + managerId + ", name=" + name + ", type=" + type
				+ ", articalIds=" + articalIds + ", status=" + status + ", address=" + address + ", link=" + link
				+ ", deleted=" + deleted + ", grade=" + grade + "]";
	}
	
	
}
