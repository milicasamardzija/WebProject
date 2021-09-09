package dao;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Collection;
import java.util.Collections;
import java.util.Comparator;
import java.util.HashMap;

import com.fasterxml.jackson.annotation.JsonAutoDetect;
import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;
import com.fasterxml.jackson.databind.introspect.VisibilityChecker;
import com.fasterxml.jackson.databind.type.MapType;
import com.fasterxml.jackson.databind.type.TypeFactory;

import beans.Order;
import beans.Restaurant;
import beans.User;
import dto.OrderDTO;
import enums.CustomerType;
import enums.OrderStatus;
import enums.RestaurantType;
import enums.Role;


public class OrderDAO {

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

	public RestaurantType checkRestaurantType(String userType) {
		RestaurantType status=null;
		if(userType.equals("italijanski")) {
			status=RestaurantType.ITALIAN;
		}
		if(userType.equals("pecenje")) {
			status=RestaurantType.BARBECUE;
		}
		 if(userType.equals("kineski")) {
			 status=RestaurantType.CHINESE;
		} 
		 if(userType.equals("riblji")) {
			 status=RestaurantType.FISH;
		} 
		 if(userType.equals("meksicki")) {
			 status=RestaurantType.MEXICAN;
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
	
	public void changeStatus(int id) {
		Order order = getByIdOrder(id);
		if(order.getStatus().equals(OrderStatus.OBRADA)) {
			order.setStatus(OrderStatus.OTKAZANA);
			saveOrders();
		}
		
	}

	//upis u fajl
	private void saveOrders() {
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
	
}
