package dao;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.Instant;
import java.time.LocalDate;
import java.time.ZoneId;
import java.time.format.DateTimeFormatter;
import java.time.format.DateTimeFormatterBuilder;
import java.time.temporal.TemporalAccessor;
import java.util.Date;
import java.util.ArrayList;
import java.util.Collection;
import java.util.HashMap;
import java.util.Iterator;
import java.util.Locale;

import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletRequest;
import javax.ws.rs.core.Context;
import javax.xml.bind.ParseConversionEvent;

import com.fasterxml.jackson.annotation.JsonAutoDetect;
import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;
import com.fasterxml.jackson.databind.introspect.VisibilityChecker;
import com.fasterxml.jackson.databind.type.MapType;
import com.fasterxml.jackson.databind.type.TypeFactory;

import beans.Comment;
import beans.Order;
import beans.SuspiciousUsers;
import beans.User;
import dao.RestaurantDAO;
import dto.ArticalChartsDTO;
import dto.OrderDTO;
import dto.OrderSearchDTO;
import enums.CustomerType;
import enums.OrderStatus;
import enums.RestaurantType;


public class OrderDAO {
	
	@Context
	HttpServletRequest request;
	@Context
	ServletContext context;

	private HashMap<Integer, Order> orders;

	public HashMap<Integer, Order> getOrders() {
		return orders;
	}

	public void setOrders(HashMap<Integer, Order> orders) {
		this.orders = orders;
	}

	public OrderDAO(HashMap<Integer, Order> orders) {
		super();
		this.orders = orders;
	}
	public OrderDAO() {
		this.setOrders(new HashMap<Integer, Order>());
		loadOrders();
	}
	
	
	
	//citanje iz fajla
	@SuppressWarnings("unchecked")
	public void loadOrders() {
		FileWriter fileWriter = null;
		BufferedReader in = null;
		File file = null;
		try {
			file = new File("WebContent/data/orders.txt");
			in = new BufferedReader(new FileReader(file));

			ObjectMapper objectMapper = new ObjectMapper();
			objectMapper.setVisibilityChecker(
					VisibilityChecker.Std.defaultInstance().withFieldVisibility(JsonAutoDetect.Visibility.ANY));
			TypeFactory factory = TypeFactory.defaultInstance();
			MapType type = factory.constructMapType(HashMap.class, Integer.class, Order.class);
			objectMapper.getFactory().configure(JsonGenerator.Feature.ESCAPE_NON_ASCII, true);
			this.orders = ((HashMap<Integer, Order>) objectMapper.readValue(file, type));
		} catch (FileNotFoundException fnfe) {
			try {
				file.createNewFile();
				fileWriter = new FileWriter(file);
				ObjectMapper objectMapper = new ObjectMapper();
				objectMapper.configure(SerializationFeature.INDENT_OUTPUT, true);
				objectMapper.getFactory().configure(JsonGenerator.Feature.ESCAPE_NON_ASCII, true);
				String string = objectMapper.writeValueAsString(orders);
				fileWriter.write(string);
			} catch (IOException e) {
				e.printStackTrace();
			} finally {
				if (fileWriter != null) {
					try {
						fileWriter.close();
					} catch (Exception e) {
						e.printStackTrace();
					}
				}
			}

		} catch (Exception ex) {
			ex.printStackTrace();
		} finally {
			if (in != null) {
				try {
					in.close();
				} catch (Exception e) {
					e.printStackTrace();
				}
			}
		}
	}
	
	
	public Collection<Order> getValues(){
		loadOrders();
		return this.orders.values();
	}

	public RestaurantType checkRestaurantType(String userType) {
		RestaurantType status=null;
		if(userType.equals("italijanski")) {
			status=RestaurantType.ITALIJANSKI;
		}
		if(userType.equals("pecenje")) {
			status=RestaurantType.ROSTILJ;
		}
		 if(userType.equals("kineski")) {
			 status=RestaurantType.KINESKI;
		} 
		 if(userType.equals("riblji")) {
			 status=RestaurantType.RIBLJI;
		} 
		 
		 if(userType.equals("pica")) {
			 status=RestaurantType.PIZZA;
		} 
		 if(userType.equals("vege")) {
			 status=RestaurantType.VEGE;
		} 
		return status;
	}
	
	public OrderStatus checkOrderType(String userType) {
		OrderStatus status=null;
		if(userType.equals("obrada")) {
			status=OrderStatus.OBRADA;
		}
		if(userType.equals("priprema")) {
			status=OrderStatus.U_PRIPREMI;
		}
		 if(userType.equals("ceka")) {
			 status=OrderStatus.CEKA_DOSTAVLJACA;
		} 
		 if(userType.equals("transport")) {
			 status=OrderStatus.U_TRANSPORTU;
		} 
		 if(userType.equals("dostavljena")) {
			 status=OrderStatus.DOSTAVLJENA;
		} 
		 if(userType.equals("otkazana")) {
			 status=OrderStatus.OTKAZANA;
		} 
		return status;
	}
	


	public Order getByIdOrder(int idOrder) {
		for(Order order : this.getValues()) {
			if(order.getId() == idOrder) {
				return order;
			}
		}
		return null;
	}
	public Collection<Order> searchOrderForManager(OrderSearchDTO search, User user){
		ArrayList<Order> ret = new ArrayList<Order>();
		
		for(Order order : this.orders.values()) {
			if( order.getRetaurantId() == user.getIdRestaurant() && order.getPrice() >= search.priceFrom && order.getPrice() <= search.priceTo && (order.getDate().compareTo(search.dateFrom) > 0) && (search.dateTo.compareTo(order.getDate()) > 0)) {
				ret.add(order);
			}
		}
		
		return ret;
	}
	
	
	public ArrayList<OrderDTO> searchOrderForUser(OrderSearchDTO search, User user, Collection<OrderDTO> ordersDto){
		ArrayList<OrderDTO> ret = new ArrayList<OrderDTO>();
	System.out.println("*************************************************************");
		for(OrderDTO order : ordersDto) {
			//String ime= findNameRestaurant(order.getRetaurantId());
			//System.out.println(" IME RESTORANA " + ime);
			if( order.getIdCustomer().equals(user.getUsername()) && order.restaurantName.toLowerCase().contains(search.restaurantName.toLowerCase()) ) {
				if(order.getPrice() >= search.priceFrom && order.getPrice() <= search.priceTo && (order.getDate().compareTo(search.dateFrom) > 0) && (search.dateTo.compareTo(order.getDate()) > 0)) {
					ret.add(order);
				}
				
			}
		}
		
		return ret;
	}
	//zatrazi dostavu
	public Collection<Order> askForDeliver(String idDeliver, int idOrder) {
		Order order=getByIdOrder(idOrder); //nasla sam je ;
		order.setPotencialDeliverer(idDeliver);
		saveOrders(); //sacuvaj sve 
		return this.getValues(); //zelim da mi se vrate te izmenjene porudzbine nad kojima sam radila
	}
	
	//odobri dostavu dostavu 
	public void getInCharge(int idOrder) {
		Order order=getByIdOrder(idOrder); //nasla sam je 
		order.setIdDeliverer(order.getPotencialDeliverer());
		saveOrders(); //sacuvaj sve 
		
	}
	
	public void changeDeliverer(int id) {
		ArrayList<OrderDTO> ret = new ArrayList<OrderDTO>();
		Collection<Order> orders = this.getValues();
			
		for (Order order : orders) {
			if (order.getId() == id) {
				order.setIdDeliverer(order.getPotencialDeliverer());
				order.setStatus(OrderStatus.U_TRANSPORTU);
			}
		}
		
		this.saveOrders();
	}
	
	private String findNameRestaurant(int id) {
		RestaurantDAO restaurantsDAO = getRestaurantsDAO();
		System.out.println( restaurantsDAO.getByID(id));
		System.out.println(restaurantsDAO.getByID(id).getName());
		return restaurantsDAO.getByID(id).getName();
	}
	
	private RestaurantDAO getRestaurantsDAO() {
		RestaurantDAO restaurants = (RestaurantDAO)context.getAttribute("restaurants");
		if (restaurants == null) {
			restaurants = new RestaurantDAO();
			context.setAttribute("restaurants", restaurants);
		}
		return restaurants;
	}
	
	public void deleteOrderById(int id) {
		Order order = getByIdOrder(id);
		if(order != null && !order.getDeleted()) {
			order.setDeleted(true);
			saveOrders();
		}
	}

	public Order getByIdCustomer(String id) {
		for(Order order : this.getValues()) {
			if(order.getIdCustomer() == id) {
				return order;
			}
		}
		return null;
	}
	
	//otkazivanje porudzbine kod kupca
	public void changeStatusCancel(int id) {
		Order order = getByIdOrder(id);
		if(order.getStatus().equals(OrderStatus.OBRADA)) {
			order.setStatus(OrderStatus.OTKAZANA);
			saveOrders();
		}
	}

	//upis u fajl
	public void saveOrders() {
		File f = new File("WebContent/data/orders.txt");
		FileWriter fileWriter = null;
		try {
			fileWriter = new FileWriter(f);
			ObjectMapper objectMapper = new ObjectMapper();
			objectMapper.configure(SerializationFeature.INDENT_OUTPUT, true);
			objectMapper.getFactory().configure(JsonGenerator.Feature.ESCAPE_NON_ASCII, true);
			String string = objectMapper.writeValueAsString(this.orders);
			fileWriter.write(string);
			fileWriter.flush();
		} catch (IOException e) {
			e.printStackTrace();
		} finally {
			if (fileWriter != null) {
				try {
					fileWriter.close();
				} catch (Exception e) {
					e.printStackTrace();
				}
			}
		}
	}
	
	private Integer generateIdOrder() {
		int ret = 0;
        for (Order orderBig : this.getValues())
        {
            for (Order order : this.getValues())
            {
                if (ret == order.getId())
                {
                    ++ret;
                    break;
                }
            }
        }
        return ret;
	}

	public Collection<Order> changeStatusManager(int id) {
		Order order = getByIdOrder(id);
		if(order.getStatus().equals(OrderStatus.U_PRIPREMI)) {
			order.setStatus(OrderStatus.CEKA_DOSTAVLJACA);
			saveOrders();
		}
		return getOrdersManager();
	}
	
	public Collection<Order> getOrdersManager() {
		User user = (User)request.getSession().getAttribute("loginUser");		
		ArrayList<Order> ret = new ArrayList<Order>();
		
		for(Order order : this.getValues()) {
			if(!order.getDeleted() && order.getRetaurantId() == user.getIdRestaurant()) {
			ret.add(order);
			}
		}
		return ret;
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

	public void addNewOrder(ArrayList<ArticalChartsDTO> articalsChart, User user){;
	System.out.println("------------------------------------------");
		System.out.println(user);
		ArticalChartsDTO oneArticalInChart = new ArticalChartsDTO();
		double price = 0;
		ArrayList<Integer> articalIds = new ArrayList<Integer>();
		
		for (ArticalChartsDTO articalChart : articalsChart) {
			articalIds.add(articalChart.getArticalInRestaurantId());
			oneArticalInChart = articalChart;
			price += articalChart.getPrice() * articalChart.getQuantity();
		}
	
		if (user.getTypeCustomer().getType() != CustomerType.NONE) {
			price = price - price*(user.getTypeCustomer().getSale() / 100);
		} 
		
		int id = this.generateIdOrder();
		this.orders.put(id, new Order(id, articalIds, oneArticalInChart.getRetaurantId(), new Date(), price, user.getUsername(), OrderStatus.OBRADA, false, "x", "", oneArticalInChart.getRestaurantType()));
		System.out.println("------------------------------------------");
		System.out.println(new Order(id, articalIds, oneArticalInChart.getRetaurantId(), new Date(), price, user.getUsername(), OrderStatus.OBRADA, false, "x", "", oneArticalInChart.getRestaurantType()));
		System.out.println("------------------------------------------");
		this.saveOrders();
		System.out.println("brisem atrikle za usera " + user.getName());
		ArticalChartDAO chart = new ArticalChartDAO();
		for(ArticalChartsDTO articalChart : articalsChart) {
			System.out.println("Artikal za brisanje je sa id " + articalChart.getId());
			chart.deleteArticalById(articalChart.getId());
			
		}
		
		
	}

	public void cancelOrder(User userByUsername, String idOrder) throws ParseException {
		SuspiciousUsersDAO suspisiousUsers = new SuspiciousUsersDAO("");
		Order order = getByIdOrder(Integer.parseInt(idOrder));
		if(order.getStatus().equals(OrderStatus.OBRADA) && order.getIdCustomer().equals(userByUsername.getUsername())) {
			order.setStatus(OrderStatus.OTKAZANA);
			saveOrders();
		}
		suspisiousUsers.addNew(new SuspiciousUsers(-1, userByUsername.getUsername(), order.getId(), new Date()));
		checkIfUserIsSuspiciuos(userByUsername, order.getDate());
	}
	
	private SuspiciousUsersDAO getSuspiciousUsers() {
		SuspiciousUsersDAO users = (SuspiciousUsersDAO)context.getAttribute("SuspiciousUsers");
		
		if (users == null) {
			String contextPath = context.getRealPath("");
			users = new SuspiciousUsersDAO(contextPath);
			context.setAttribute("SuspiciousUsers", users);
		}
		return users;
	}
	
	@SuppressWarnings("deprecation")
	private void checkIfUserIsSuspiciuos(User user , Date lastCancelation) throws ParseException {
		
		SuspiciousUsersDAO suspisiousUsers = new SuspiciousUsersDAO("");
		UsersDAO usersDao = new UsersDAO("");
		Collection<SuspiciousUsers> all = suspisiousUsers.getValues();
		int br = 0;
		
		ZoneId defaultZoneId = ZoneId.systemDefault();
		
		//Converting the date to Instant
		Instant instant = lastCancelation.toInstant();
			
		//Converting the Date to LocalDate	
		LocalDate rangeDate = instant.atZone(defaultZoneId).toLocalDate();;
		
		Date covertToDate = Date.from(rangeDate.minusDays(30).atStartOfDay(ZoneId.systemDefault()).toInstant());
		System.out.println(covertToDate);
		for (SuspiciousUsers suspiciousUsers : all) {
			System.out.println(suspiciousUsers);
			if (suspiciousUsers.getUserId().equals(user.getUsername())) {
				System.out.println("ZNAM KO JE");
				System.out.println(covertToDate);
				System.out.println(suspiciousUsers.getDateOfCancelation());
				System.out.println(lastCancelation);
				if (lastCancelation.after(covertToDate) && lastCancelation.before(suspiciousUsers.getDateOfCancelation())) {
					System.out.println("TU SAM");
					br++;
				}
			}
		}
		System.out.println(br);
		
		if (br > 5 ) {
			usersDao.setUserSuspisious(user);
		}		
	}
				
}
