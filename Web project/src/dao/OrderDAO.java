package dao;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Collection;
import java.util.HashMap;

import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletRequest;
import javax.ws.rs.core.Context;

import com.fasterxml.jackson.annotation.JsonAutoDetect;
import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;
import com.fasterxml.jackson.databind.introspect.VisibilityChecker;
import com.fasterxml.jackson.databind.type.MapType;
import com.fasterxml.jackson.databind.type.TypeFactory;

import beans.Order;
import dto.OrderDTO;
import enums.OrderStatus;


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
	private void loadOrders() {
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
		return this.orders.values();
	}
	
	public Order getByIdOrder(int idOrder) {
		for(Order order : this.getValues()) {
			if(order.getId() == idOrder) {
				return order;
			}
		}
		return null;
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

	//upis u fajl
	private void saveOrders() {
		File f = new File("WebContent/data/restaurants.txt");
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
	
	public Order addOrder(OrderDTO order) {
		Order newOrder ;
		return null;
		
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

	public Collection<OrderDTO> changeToDelivered(String id) {
		ArrayList<OrderDTO> ret= new ArrayList<OrderDTO>();
		
		Collection<Order> orders = this.getValues();
		for(Order order : orders) {
			if(order.getId() == Integer.parseInt(id)) {
				order.setStatus(OrderStatus.DOSTAVLJENA);
				this.saveOrders();
			}
		}
		
		Collection<Order> ordersChanged = getValues();		
		
		for(Order order : ordersChanged) {
			ret.add(new OrderDTO(order.getId(), findNameRestaurant(order.getId()), order.getDate(), order.getPrice(), order.getIdCustomer(), order.getStatus(), order.getDeleted()));
		}
		
		return ret;
	}
	
	private String findNameRestaurant(int id) {
		RestaurantDAO restaurantsDAO = getRestaurantsDAO();
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
	
}
