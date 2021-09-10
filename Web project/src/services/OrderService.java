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
			ret.add(new OrderDTO(order.getId(), findOrderArticals(order.getArticalIds()),findNameRestaurant(order.getId()), order.getDate(), order.getPrice(), order.getIdCustomer(), order.getStatus(), order.getDeleted(),order.getPotencialDeliverer(), order.getIdDeliverer(), order.getRestaurantType()));
			
		}
		return ret;
		
	}
	
	//porudzbine za ulogovanog usera
	@GET
	@Path("/getOrders")
	@Produces(MediaType.APPLICATION_JSON)
	public Collection<OrderDTO> getOrdersAll(){
		ArrayList<OrderDTO> ret= new ArrayList<OrderDTO>();
		OrderDAO ordersDAO = getOrders();
		//RestaurantDAO restaurantsDAO = getRestaurantsDAO();
		Collection<Order> orders = ordersDAO.getValues();
		User user = (User)request.getSession().getAttribute("loginUser");		
		
		for(Order order : orders) {
			if(!order.getDeleted() && order.getIdCustomer().equals(user.getUsername())) {
			ret.add(new OrderDTO(order.getId(), findOrderArticals(order.getArticalIds()),findNameRestaurant(order.getId()), order.getDate(), order.getPrice(), order.getIdCustomer(), order.getStatus(), order.getDeleted(),order.getPotencialDeliverer(), order.getIdDeliverer(), order.getRestaurantType()));
			}
		}
		return ret;
		
	}
	//porudzbine za ulogovanog dostavljaca
	@GET
	@Path("/getDelivererOrders")
	@Produces(MediaType.APPLICATION_JSON)
	public Collection<OrderDTO> getOrdersDeliverer(){
		ArrayList<OrderDTO> ret= new ArrayList<OrderDTO>();
		OrderDAO ordersDAO = getOrders();
		//RestaurantDAO restaurantsDAO = getRestaurantsDAO();
		Collection<Order> orders = ordersDAO.getValues();
		User user = (User)request.getSession().getAttribute("loginUser");		
		
		for(Order order : orders) {
			if(!order.getDeleted() && order.getIdDeliverer().equals(user.getUsername()) && order.getStatus() != OrderStatus.CEKA_DOSTAVLJACA ) {
				System.out.println("TU SAM TRAAZIM");
			ret.add(new OrderDTO(order.getId(), findOrderArticals(order.getArticalIds()),findNameRestaurant(order.getId()), order.getDate(), order.getPrice(), order.getIdCustomer(), order.getStatus(), order.getDeleted(),order.getPotencialDeliverer(), order.getIdDeliverer(), order.getRestaurantType()));
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
	
	//otkazivanje porudzbine kod kupca
	@POST
	@Path("/changeStatusCancel")
	public void changeStatus(String id) {
	 OrderDAO ordersDAO = getOrders();
	 ordersDAO.changeStatusCancel(Integer.parseInt(id));
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
	
	//filtrira porudzbine po dostavljacu
	@POST 
	@Path("/filterDelivererRestaurantTypeOrders")
	@Produces(MediaType.APPLICATION_JSON)
	public Collection<OrderDTO> filterDeliverersOrdersbyTypeRestaurant(String typeRestaurant){
		ArrayList<OrderDTO> ret= new ArrayList<OrderDTO>();
		OrderDAO orderDAO= new OrderDAO();
		RestaurantType type=orderDAO.checkRestaurantType(typeRestaurant);
		ArrayList<OrderDTO> myOrders=(ArrayList<OrderDTO>) getOrdersDeliverer(); //dostavljaceve 
		for(OrderDTO order : myOrders) {
			if(order.getRestaurantType().equals(type) && !order.getDeleted()) {
			ret.add(order);
			}
		}
		return ret;
	}
	
	//za kupca njegove porudzbine
	@GET
	@Path("/getUndeliveredOrders")
	@Produces(MediaType.APPLICATION_JSON)
	public Collection<OrderDTO> getUndelivered(){
		ArrayList<OrderDTO> ret= new ArrayList<OrderDTO>();
		OrderDAO ordersDAO = getOrders(); //sve porudzbine
		Collection<Order> orders = ordersDAO.getValues(); //sve porudzbine
		User user = (User)request.getSession().getAttribute("loginUser");		//dobijam ulogovanog dostavljaca
		
		for(Order order : orders) {
			if(!order.getDeleted() && order.getIdCustomer().equals(user.getUsername()) && order.getStatus() != OrderStatus.DOSTAVLJENA && order.getStatus() != OrderStatus.OTKAZANA ) {
			ret.add(new OrderDTO(order.getId(), findOrderArticals(order.getArticalIds()),findNameRestaurant(order.getId()), order.getDate(), order.getPrice(), order.getIdCustomer(), order.getStatus(), order.getDeleted(),order.getPotencialDeliverer(), order.getIdDeliverer(), order.getRestaurantType()));
			}
		}
		return ret;	
	}
	
	//sortiranje svih porudzbina kupca
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
	
	//sortiranje SVIH dostavljacevih porudzbina
		@POST
		@Path("/sortDelivererOrders")
		@Produces(MediaType.APPLICATION_JSON)
		public Collection<OrderDTO> sortDelivererOrders(String type) {
			ArrayList<OrderDTO> myOrders=(ArrayList<OrderDTO>) getOrdersDeliverer(); //uzimam sve  porudzbine ulogovanog
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
	
		

		//filtrira porudzbine po na cekanju po tipu restorana
		@POST 
		@Path("/filterRestaurantTypeOnWaitOrders")
		@Produces(MediaType.APPLICATION_JSON)
		public Collection<OrderDTO> filterOnWaitOrdersTypeRestaurant(String typeRestaurant){
			ArrayList<OrderDTO> ret= new ArrayList<OrderDTO>();
			OrderDAO orderDAO= new OrderDAO();
			RestaurantType type=orderDAO.checkRestaurantType(typeRestaurant);
			ArrayList<OrderDTO> myOrders=(ArrayList<OrderDTO>)this.getAllOrdersForDelivererOnWait(); //dostavljaceve 
			for(OrderDTO order : myOrders) {
				if(order.getRestaurantType().equals(type) && !order.getDeleted()) {
				ret.add(order);
				}
			}
			return ret;
		}
		
		@POST 
		@Path("/askForDelivery")
  public void askForDelivery(String idOrder) {
	  User deliverer = (User)request.getSession().getAttribute("loginUser");		//imam id deliverera
	  OrderDAO dao= getOrders();
	  dao.askForDeliver(deliverer.getUsername(), Integer.parseInt(idOrder));
	  
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
	
	
	
	//milicaa
	//sve porudzbine ulogovanog dostavljaca
	@GET
	@Path("/getAllOrdersForDeliverer")
	@Produces(MediaType.APPLICATION_JSON)
	public Collection<OrderDTO> getAllOrdersForDeliverer(){
		ArrayList<OrderDTO> ret= new ArrayList<OrderDTO>();
		OrderDAO ordersDAO = getOrders();
		Collection<Order> orders = ordersDAO.getValues();
		User user = (User)request.getSession().getAttribute("loginUser");		
		
		for(Order order : orders) {
			if(!order.getDeleted() && order.getIdDeliverer().equals(user.getUsername())) {
			ret.add(new OrderDTO(order.getId(), findOrderArticals(order.getArticalIds()),findNameRestaurant(order.getId()), order.getDate(), order.getPrice(), order.getIdCustomer(), order.getStatus(), order.getDeleted(),order.getPotencialDeliverer(), order.getIdDeliverer(), order.getRestaurantType()));
			}
		}
		return ret;
		
	}



//sve porudzbine ulogovanog dostavljaca koje nisu dostavljene 
	@GET
	@Path("/getAllOrdersForDelivererNotDelivered")
	@Produces(MediaType.APPLICATION_JSON)
	public Collection<OrderDTO> getAllOrdersForDelivererNotDelivered(){
		ArrayList<OrderDTO> ret= new ArrayList<OrderDTO>();
		OrderDAO ordersDAO = getOrders();
		Collection<Order> orders = ordersDAO.getValues();
		User user = (User)request.getSession().getAttribute("loginUser");		
		System.out.println(user.getUsername());
		
		for(Order order : orders) {
			System.out.println((order.getStatus()));System.out.println(order.getIdDeliverer());
			if(!order.getDeleted() && order.getIdDeliverer().equals(user.getUsername()) && order.getStatus() != OrderStatus.DOSTAVLJENA &&order.getStatus() != OrderStatus.OTKAZANA && order.getStatus() != OrderStatus.CEKA_DOSTAVLJACA ) {
			ret.add(new OrderDTO(order.getId(), findOrderArticals(order.getArticalIds()),findNameRestaurant(order.getId()), order.getDate(), order.getPrice(), order.getIdCustomer(), order.getStatus(), order.getDeleted(),order.getPotencialDeliverer(), order.getIdDeliverer(), order.getRestaurantType()));
			}
		}
		return ret;
		
	}

	//dostavljanje porudzbine kod dostavljaca
	@POST
	@Path("/changeToDelivered")
	@Produces(MediaType.APPLICATION_JSON)
	public void changeToDelivered(String id){
		OrderDAO ordersDAO = getOrders();		
		changeToDeliveredStatus(id); //salje se id porudzbine
			
	}


	//iscitavanje onih na cekanju
	@GET
	@Path("/getAllOrdersForDelivererOnWait")
	@Produces(MediaType.APPLICATION_JSON)
	public Collection<OrderDTO> getAllOrdersForDelivererOnWait(){
		ArrayList<OrderDTO> ret= new ArrayList<OrderDTO>();
		OrderDAO ordersDAO = getOrders();
		Collection<Order> orders = ordersDAO.getValues();		
		
		for(Order order : orders) {
			if(!order.getDeleted()  && order.getStatus().equals(OrderStatus.CEKA_DOSTAVLJACA)) {
			ret.add(new OrderDTO(order.getId(), findOrderArticals(order.getArticalIds()),findNameRestaurant(order.getId()), order.getDate(), order.getPrice(), order.getIdCustomer(), order.getStatus(), order.getDeleted(),order.getPotencialDeliverer(), order.getIdDeliverer(), order.getRestaurantType()));
			}
		}
		return ret;
	}
	
	//sortiranje porudzbina na cekanju
	//sortiranje SVIH NA CEKANJU porudzbina
			@POST
			@Path("/sortDelivererOnWaitOrders")
			@Produces(MediaType.APPLICATION_JSON)
			public Collection<OrderDTO> sortDelivererOnWaitOrders(String type) {
			//	ArrayList<OrderDTO> allOrders= (ArrayList<OrderDTO>) getAll(); //uzimam sve  porudzbine ulogovanog
				ArrayList<OrderDTO> ret = new ArrayList<OrderDTO>(getAllOrdersForDelivererOnWait());
					if(type.equals("imeRastuce")) {
						 Collections.sort(ret, new Comparator<OrderDTO>(){
							    public int compare(OrderDTO s1, OrderDTO s2) {
							        return s1.getRestaurantName().compareToIgnoreCase(s2.getRestaurantName());
							    }
							});
					 }
					 if(type.equals("imeOpadajuce")) {
						 Collections.sort(ret, new Comparator<OrderDTO>(){
							    public int compare(OrderDTO s1, OrderDTO s2) {
							        return s2.getRestaurantName().compareToIgnoreCase(s1.getRestaurantName());
							    }
							});
					 }
					 if(type.equals("opadajuce")) {
						 ret = (ArrayList<OrderDTO>) ret.stream().sorted(Comparator.comparingInt(OrderDTO::getPrice).reversed()).collect(Collectors.toList());
					 }
					 if(type.equals("rastuce")) {
						 ret = (ArrayList<OrderDTO>) ret.stream().sorted(Comparator.comparingInt(OrderDTO::getPrice)).collect(Collectors.toList());
					 }
					 if(type.equals("datumRastuce")) {
						 Collections.sort(ret, new Comparator<OrderDTO>(){
							    public int compare(OrderDTO s1, OrderDTO s2) {
							        return s1.getDate().compareTo(s2.getDate());
							    }
							});
					 }
					if(type.equals("datumOpadajuce")) {
						 Collections.sort(ret, new Comparator<OrderDTO>(){
							    public int compare(OrderDTO s1, OrderDTO s2) {
							        return s2.getDate().compareTo(s1.getDate());
							    }
							});
					 }
					 return ret;
				}

	//sortiranje porudzbina na cekanju
	//sortiranje SVIH NA CEKANJU porudzbina
	@POST
	@Path("/sortDelivererUndeliveredOrders")
	@Produces(MediaType.APPLICATION_JSON)
	public Collection<OrderDTO> sortDelivererUndeliveredOrders(String type) {
	ArrayList<OrderDTO> ret = new ArrayList<OrderDTO>(getAllOrdersForDelivererNotDelivered());
			if(type.equals("imeRastuce")) {
			 Collections.sort(ret, new Comparator<OrderDTO>(){
			    public int compare(OrderDTO s1, OrderDTO s2) {
							    return s1.getRestaurantName().compareToIgnoreCase(s2.getRestaurantName());
								  }
							});
				 }
							 if(type.equals("imeOpadajuce")) {
								 Collections.sort(ret, new Comparator<OrderDTO>(){
									    public int compare(OrderDTO s1, OrderDTO s2) {
									        return s2.getRestaurantName().compareToIgnoreCase(s1.getRestaurantName());
									    }
									});
							 }
							 if(type.equals("opadajuce")) {
								 ret = (ArrayList<OrderDTO>) ret.stream().sorted(Comparator.comparingInt(OrderDTO::getPrice).reversed()).collect(Collectors.toList());
							 }
							 if(type.equals("rastuce")) {
								 ret = (ArrayList<OrderDTO>) ret.stream().sorted(Comparator.comparingInt(OrderDTO::getPrice)).collect(Collectors.toList());
							 }
							 if(type.equals("datumRastuce")) {
								 Collections.sort(ret, new Comparator<OrderDTO>(){
									    public int compare(OrderDTO s1, OrderDTO s2) {
									        return s1.getDate().compareTo(s2.getDate());
									    }
									});
							 }
							if(type.equals("datumOpadajuce")) {
								 Collections.sort(ret, new Comparator<OrderDTO>(){
									    public int compare(OrderDTO s1, OrderDTO s2) {
									        return s2.getDate().compareTo(s1.getDate());
									    }
									});
							 }
							 return ret;
						}

			
			
	
//iz dao ali ipak ovde
	//milicino
	public void changeToDeliveredStatus(String id) {
		//ArrayList<OrderDTO> ret= new ArrayList<OrderDTO>();
		OrderDAO dao = new OrderDAO();
		Collection<Order> orders = dao.getValues();
		for(Order order : orders) {
			if(order.getId() == Integer.parseInt(id)) {
				order.setStatus(OrderStatus.DOSTAVLJENA);
				dao.saveOrders();
			}
		}
		/*Collection<Order> ordersChanged = dao.getValues();		
		for(Order order : ordersChanged) {
			ret.add(new OrderDTO(order.getId(),findOrderArticals(order.getArticalIds()), findNameRestaurant(order.getId()), order.getDate(), order.getPrice(), order.getIdCustomer(), order.getStatus(), order.getDeleted(), order.getIdDeliverer(), order.getRestaurantType()));
		} return ret;*/
		
	}
	
	


	
}
