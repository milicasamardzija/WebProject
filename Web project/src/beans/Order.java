package beans;

import java.util.ArrayList;
import java.util.Date;

import org.apache.tomcat.jni.Time;

import enums.OrderStatus;

public class Order {
	private String id; // karaktera
	private ArrayList<Integer> articalIds; // ArticalChart!!
	private int retaurantId;
	private Date date; //datum i vreme
	private double price;
	private String idCustomer;
	private OrderStatus status;
}
