package beans;

import java.util.Date;

public class SuspiciousUsers {

	private int id;
	private String userId;
	private int orderId;
	private Date dateOfCancelation;
	
	public SuspiciousUsers(int id, String userId, int orderId, Date dateOfCancelation) {
		super();
		this.id = id;
		this.userId = userId;
		this.orderId = orderId;
		this.dateOfCancelation = dateOfCancelation;
	}

	public SuspiciousUsers() {}
	
	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getUserId() {
		return userId;
	}

	public void setUserId(String userId) {
		this.userId = userId;
	}

	public int getOrderId() {
		return orderId;
	}

	public void setOrderId(int orderId) {
		this.orderId = orderId;
	}

	public Date getDateOfCancelation() {
		return dateOfCancelation;
	}

	public void setDateOfCancelation(Date dateOfCancelation) {
		this.dateOfCancelation = dateOfCancelation;
	}

	@Override
	public String toString() {
		return "SuspiciousUsers [id=" + id + ", userId=" + userId + ", orderId=" + orderId + ", dateOfCancelation="
				+ dateOfCancelation + "]";
	}
	
}
