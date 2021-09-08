package services;

import java.util.ArrayList;
import java.util.Collection;

import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletRequest;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;

import beans.Order;
import beans.User;
import dao.OrderDAO;
import dao.RestaurantDAO;
import dto.OrderDTO;
import enums.OrderStatus;

@Path("/order")
public class OrderService {
	
	@Context
	HttpServletRequest request;
	@Context
	ServletContext context;
	
	public OrderService() {
		
	}
	
	@GET
	@Path("/getAllOrders")
	@Produces(MediaType.APPLICATION_JSON)
	public Collection<OrderDTO> getAll(){
		ArrayList<OrderDTO> ret= new ArrayList<OrderDTO>();
		OrderDAO ordersDAO = getOrders();
		//RestaurantDAO restaurantsDAO = getRestaurantsDAO();
		Collection<Order> orders = ordersDAO.getValues();
		System.out.println("UZIMAM PORUDZBINE");
		for(Order order : orders) {
			
				System.out.println("ID ORDER: " + order.getId());
			ret.add(new OrderDTO(order.getId(), findNameRestaurant(order.getId()), order.getDate(), order.getPrice(), order.getIdCustomer(), order.getStatus(), order.getDeleted()));
			
		}
		return ret;
		
	}
	
	@POST
	@Path("/getOrders")
	//@Consumes(MediaType.TEXT_HTML)
	@Produces(MediaType.APPLICATION_JSON)
	public Collection<OrderDTO> getOrdersAll(){
		ArrayList<OrderDTO> ret= new ArrayList<OrderDTO>();
		OrderDAO ordersDAO = getOrders();
		//RestaurantDAO restaurantsDAO = getRestaurantsDAO();
		Collection<Order> orders = ordersDAO.getValues();
		User user = (User)request.getSession().getAttribute("loginUser");		
		
		for(Order order : orders) {
			if(!order.getDeleted() && order.getIdCustomer().equals(user.getUsername())) {
			ret.add(new OrderDTO(order.getId(), findNameRestaurant(order.getId()), order.getDate(), order.getPrice(), order.getIdCustomer(), order.getStatus(), order.getDeleted()));
			}
		}
		return ret;
		
	}
	
	private String findNameRestaurant(int id) {
		RestaurantDAO restaurantsDAO = getRestaurantsDAO();
		return restaurantsDAO.getByID(id).getName();
	}
	
	private OrderDAO getOrders() {
		OrderDAO orders = (OrderDAO)context.getAttribute("orders");
		if(orders == null) {
			orders= new OrderDAO();
			context.setAttribute("orders", orders);
		}
		return orders;
	}
	
	private RestaurantDAO getRestaurantsDAO() {
		RestaurantDAO restaurants = (RestaurantDAO)context.getAttribute("restaurants");
		
		if (restaurants == null) {
			restaurants = new RestaurantDAO();
			context.setAttribute("restaurants", restaurants);
		}
	
		return restaurants;
	}
	
	//iscitavanje porudzbina za dostavljaca
	@GET
	@Path("/getAllOrdersForDelivererOnWait")
	@Produces(MediaType.APPLICATION_JSON)
	public Collection<OrderDTO> getAllOrdersForDelivererOnWait(){
		ArrayList<OrderDTO> ret= new ArrayList<OrderDTO>();
		OrderDAO ordersDAO = getOrders();
		Collection<Order> orders = ordersDAO.getValues();		
		
		for(Order order : orders) {
			if(!order.getDeleted()  && order.getStatus().equals(OrderStatus.CEKA_DOSTAVLJACA)) {
			ret.add(new OrderDTO(order.getId(), findNameRestaurant(order.getId()), order.getDate(), order.getPrice(), order.getIdCustomer(), order.getStatus(), order.getDeleted()));
			}
		}
		return ret;
	}
	
}
