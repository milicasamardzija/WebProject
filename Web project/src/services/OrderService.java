package services;

import java.util.ArrayList;
import java.util.Collection;
import java.util.Collections;
import java.util.Comparator;
import java.util.Iterator;
import java.util.stream.Collectors;

import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletRequest;

import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;

import beans.Order;
import beans.User;
import dao.ArticalDAO;

import dao.OrderDAO;
import dao.RestaurantDAO;

import dto.OrderDTO;
import enums.OrderStatus;
import enums.RestaurantType;

@Path("/order")
public class OrderService {
	
	@Context
	HttpServletRequest request;
	@Context
	ServletContext context;
	
	public OrderService() {	}
	
	@GET
	@Path("/getAllOrders")
	@Produces(MediaType.APPLICATION_JSON)
	public Collection<OrderDTO> getAll(){
		ArrayList<OrderDTO> ret= new ArrayList<OrderDTO>();
		OrderDAO ordersDAO = getOrders();
		Collection<Order> orders = ordersDAO.getValues();
		System.out.println("UZIMAM PORUDZBINE");
		for(Order order : orders) {
			
			System.out.println("ID ORDER: " + order.getId());
			ret.add(new OrderDTO(order.getId(),findOrderArticals(order.getArticalIds()), findNameRestaurant(order.getId()), order.getDate(), order.getPrice(), order.getIdCustomer(), order.getStatus(), order.getDeleted(), order.getIdDeliverer(), order.getRestaurantType()));
			
		}
		return ret;
		
	}
	
	@GET
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
			ret.add(new OrderDTO(order.getId(), findOrderArticals(order.getArticalIds()), findNameRestaurant(order.getId()), order.getDate(), order.getPrice(), order.getIdCustomer(), order.getStatus(), order.getDeleted(), order.getIdDeliverer(), order.getRestaurantType()));
			}
		}
		return ret;
		
	}
	
	@POST
	@Path("/deleteOrder")
	public void deleteOrder(String id){
		OrderDAO ordersDAO = getOrders();
		ordersDAO.deleteOrderById(Integer.parseInt(id));	
	}
	
	@POST
	@Path("/changeStatus")
	public void changeStatus(String id) {
	 OrderDAO ordersDAO = getOrders();
	 ordersDAO.changeStatus(Integer.parseInt(id));
	}
	
	private String findNameRestaurant(int id) {
		RestaurantDAO restaurantsDAO = getRestaurantsDAO();
		return restaurantsDAO.getByID(id).getName();
	}
	
	
	private ArrayList<String> findOrderArticals(ArrayList<Integer> ids) {
		ArrayList<String> ret= new ArrayList<String>();
		ArticalDAO articalDAO= new ArticalDAO();
		for(int id : ids) {
			if(!articalDAO.getByID(id).getDeleted()) {
				ret.add(articalDAO.getByID(id).getName());
			}
		}
		return ret;
	}
	
	//filtrira porudzbine ulogovanog korisnika 
	@POST 
	@Path("/filterOrders")
	@Produces(MediaType.APPLICATION_JSON)
	public Collection<OrderDTO> filterOrder(String type) {
		OrderDAO orderDAO= new OrderDAO();
		OrderStatus status = orderDAO.checkOrderType(type);
		ArrayList<OrderDTO> myOrders=(ArrayList<OrderDTO>) getOrdersAll();
		ArrayList<OrderDTO> ret= new ArrayList<OrderDTO>();
		for(OrderDTO order : myOrders) {
			if(order.getStatus().equals(status) && !order.getDeleted()) {
			ret.add(order);
			}
		}
		return ret;
	}
	
	//filtrira porudzbine po tipu restorana ulogovanog korisnika
	@POST 
	@Path("/filterRestaurantTypeOrders")
	@Produces(MediaType.APPLICATION_JSON)
	public Collection<OrderDTO> filterRestaurantsOrders(String typeRestaurant){
		ArrayList<OrderDTO> ret= new ArrayList<OrderDTO>();
		OrderDAO orderDAO= new OrderDAO();
		RestaurantType type=orderDAO.checkRestaurantType(typeRestaurant);
		ArrayList<OrderDTO> myOrders=(ArrayList<OrderDTO>) getOrdersAll();
		for(OrderDTO order : myOrders) {
			if(order.getRestaurantType().equals(type) && !order.getDeleted()) {
			ret.add(order);
			}
		}
		return ret;
	}
	
	
	@GET
	@Path("/getUndeliveredOrders")
	//@Consumes(MediaType.TEXT_HTML)
	@Produces(MediaType.APPLICATION_JSON)
	public Collection<OrderDTO> getUndelivered(){
		ArrayList<OrderDTO> ret= new ArrayList<OrderDTO>();
		OrderDAO ordersDAO = getOrders();
		Collection<Order> orders = ordersDAO.getValues();
		User user = (User)request.getSession().getAttribute("loginUser");		
		
		for(Order order : orders) {
			if(!order.getDeleted() && order.getIdCustomer().equals(user.getUsername()) && order.getStatus() != OrderStatus.DOSTAVLJENA && order.getStatus() != OrderStatus.OTKAZANA ) {
			ret.add(new OrderDTO(order.getId(), findOrderArticals(order.getArticalIds()), findNameRestaurant(order.getId()), order.getDate(), order.getPrice(), order.getIdCustomer(), order.getStatus(), order.getDeleted(), order.getIdDeliverer(), order.getRestaurantType()));
			}
		}
		return ret;	
	}
	
	//sortiranje
	@POST
	@Path("/sortOrders")
	@Produces(MediaType.APPLICATION_JSON)
	public Collection<OrderDTO> sortOrders(String type) {
		ArrayList<OrderDTO> myOrders=(ArrayList<OrderDTO>) getOrdersAll(); //uzimam sve  porudzbine ulogovanog
			if(type.equals("imeRastuce")) {
				 Collections.sort(myOrders, new Comparator<OrderDTO>(){
					    public int compare(OrderDTO s1, OrderDTO s2) {
					        return s1.getRestaurantName().compareToIgnoreCase(s2.getRestaurantName());
					    }
					});
			 }
			 if(type.equals("imeOpadajuce")) {
				 Collections.sort(myOrders, new Comparator<OrderDTO>(){
					    public int compare(OrderDTO s1, OrderDTO s2) {
					        return s2.getRestaurantName().compareToIgnoreCase(s1.getRestaurantName());
					    }
					});
			 }
		
			 if(type.equals("opadajuce")) {
				 myOrders = (ArrayList<OrderDTO>) myOrders.stream().sorted(Comparator.comparingInt(OrderDTO::getPrice).reversed()).collect(Collectors.toList());
			 }
			 if(type.equals("rastuce")) {
				 myOrders = (ArrayList<OrderDTO>) myOrders.stream().sorted(Comparator.comparingInt(OrderDTO::getPrice)).collect(Collectors.toList());
			 }
				if(type.equals("datumRastuce")) {
					 Collections.sort(myOrders, new Comparator<OrderDTO>(){
						    public int compare(OrderDTO s1, OrderDTO s2) {
						        return s1.getDate().compareTo(s2.getDate());
						    }
						});
				 }
				if(type.equals("datumOpadajuce")) {
					 Collections.sort(myOrders, new Comparator<OrderDTO>(){
						    public int compare(OrderDTO s1, OrderDTO s2) {
						        return s2.getDate().compareTo(s1.getDate());
						    }
						});
				 }
			 
			 return myOrders;
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
	
	private ArticalDAO getArticalsDAO() {
		ArticalDAO articals= (ArticalDAO)context.getAttribute("articals");
		if (articals == null) {
			articals = new ArticalDAO();
			context.setAttribute("articals", articals);
		}
		return articals;
	}
	
}
