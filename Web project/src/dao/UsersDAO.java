package dao;

import java.awt.List;
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

import beans.Address;
import beans.Customer;
import beans.User;
import dto.UserChangeDTO;
import dto.UserNewDTO;
import dto.UserRegistrationDTO;
import dto.UserSearchDTO;
import enums.CustomerType;
import enums.Role;

public class UsersDAO {
	private HashMap<String,User> users;
	private String filePath = "";
	
	public HashMap<String, User> getUsers() {
		return users;
	}
	public void setUsers(HashMap<String, User> users) {
		this.users = users;
	}
	public String getFilePath() {
		return filePath;
	}
	public void setFilePath(String filePath) {
		this.filePath = filePath;
	}
	
	public UsersDAO(HashMap<String, User> users, String filePath) {
		super();
		this.users = users;
		this.filePath = filePath;
	}
	
	public UsersDAO(String contextPath) {
		this.setUsers(new HashMap<String, User>());
		this.setFilePath(contextPath);
		
		loadUsers(contextPath);
	}
	
	//ucitavanje korisnika iz fajla
	@SuppressWarnings("unchecked")
	private void loadUsers(String contextPath) {
		FileWriter fileWriter = null;
		BufferedReader in = null;
		File file = null;
		try {
			file = new File("WebContent/data/users.txt");
			in = new BufferedReader(new FileReader(file));

			ObjectMapper objectMapper = new ObjectMapper();
			objectMapper.setVisibilityChecker(
					VisibilityChecker.Std.defaultInstance().withFieldVisibility(JsonAutoDetect.Visibility.ANY));
			TypeFactory factory = TypeFactory.defaultInstance();
			MapType type = factory.constructMapType(HashMap.class, String.class, User.class);
			objectMapper.getFactory().configure(JsonGenerator.Feature.ESCAPE_NON_ASCII, true);
			this.users = ((HashMap<String, User>) objectMapper.readValue(file, type));
		} catch (FileNotFoundException fnfe) {
			try {
				file.createNewFile();
				fileWriter = new FileWriter(file);
				ObjectMapper objectMapper = new ObjectMapper();
				objectMapper.configure(SerializationFeature.INDENT_OUTPUT, true);
				objectMapper.getFactory().configure(JsonGenerator.Feature.ESCAPE_NON_ASCII, true);
				String stringUsers = objectMapper.writeValueAsString(users);
				fileWriter.write(stringUsers);
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
	
	//ucitavanje korisnika u fajl
	private void saveUsers() {
		File f = new File("WebContent/data/users.txt");
		FileWriter fileWriter = null;
		try {
			fileWriter = new FileWriter(f);
			ObjectMapper objectMapper = new ObjectMapper();
			objectMapper.configure(SerializationFeature.INDENT_OUTPUT, true);
			objectMapper.getFactory().configure(JsonGenerator.Feature.ESCAPE_NON_ASCII, true);
			String stringUsers = objectMapper.writeValueAsString(this.users);
			fileWriter.write(stringUsers);
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
	
	public User getUserByUsername(String username) {
		System.out.println("++++++++++++++++++");
		System.out.println(username);
		//System.out.println(users.values().toArray()[0].toString());
		//System.out.println(users.containsKey(username));
		System.out.println("++++++++++++++++++");
		for (User user : getValues()) {
			if(user.getUsername().equals(username)) {
				System.out.println("====");
				System.out.println(user.getUsername());
				System.out.println("====");
				return user;
			}
		}	
		return null;
	}
	
	//dodavanje novog korisnika(menadzer ili dostavljac)
	//username i password su mu ime i prezime spojeno na pocetku
	public void addUser(UserNewDTO user) {
		getUsers().put(user.name+user.surname, new User(false, false, user.name+user.surname, user.name+user.surname, user.name, user.surname, user.gender, user.birthday, user.role, new Address(user.street, user.number, user.city, user.zipCode), new ArrayList<Integer>(), 0, 0, new Customer(), 0));
		saveUsers();
	}
		
	//registrovani korisnik je uvek kupac i uvek je bronzani na pocetku
	//da li se chartId dodaje ovde??
	//podestiti bodvanje za Customer!!! - lupila sam ovde
	public void registerUser(UserRegistrationDTO user) {
		getUsers().put(user.username, new User(false, false, user.username, user.password, user.name, user.surname, user.gender, user.birthday, Role.CUSTOMER, new Address(user.street, user.number, user.city, user.zipCode), new ArrayList<Integer>(), -1, 0, new Customer(CustomerType.BRONZE,0.1,2000), -1));
		saveUsers();
	}
	
	//blokiranje korisnika
	public void blockUserById(String username) {
		User user = getUserByUsername(username);
		if(user != null) {
			user.setBlocked(true);
			saveUsers();
		}
	}
	
	public Collection<User> getValues() {
		return users.values();
	}
	
	//brisanje korisnika
	public void deleteUserById(String username) {
		User user = getUserByUsername(username);
		if(user != null) {
			user.setDeleted(true); //logicko brisanje
			System.out.println(" vrednost polja deleted" + user.getDeleted());
			saveUsers();
		}	
	}
	public void changeUser(UserChangeDTO user) {
		User userChange = getUserByUsername(user.username);
		userChange.setName(user.name);
		userChange.setSurname(user.surname);
		userChange.setAddress(new Address(user.street, user.number, user.city, user.zipCode));
		System.out.println(user.name);
		saveUsers();
	}	public Collection<User> searchUsers(UserSearchDTO searchParameters) {
		ArrayList<User> ret = new ArrayList<User>();
			for (User user : this.users.values()) {
				if(user.getName().contains(searchParameters.name) || user.getSurname().contains(searchParameters.surname) || user.getUsername().contains(searchParameters.username)) {
					ret.add(user);
				}
			}
		return ret;
	}
	
	public  Collection<User> filterUsersByRole(String userRole) {
		Role role=checkUserRole(userRole);
	
		ArrayList<User> ret= new ArrayList<User>();
		for(User user : this.users.values()) {
			if(user.getRole().equals(role) && !user.getDeleted()) {
				ret.add(user);
			}
		}
		
		return ret;
	}
	
	public CustomerType checkCustomer(String tip)
	{
		CustomerType type =null;
		if(tip.equals("bronze")) {
			type=CustomerType.BRONZE;
		}
		if(tip.equals("silver")) {
			type=CustomerType.SILVER;
		}
		 if(tip.equals("gold")) {
			type=CustomerType.GOLD;
		} 
		return type;
	}
	
	public Role checkUserRole(String tip)
	{
		Role role=null;
		if(tip.equals("kupac")) {
			role=Role.CUSTOMER;
		}
		if(tip.equals("menadzer")) {
			role=Role.MANAGER;
		}
		 if(tip.equals("dostavljac")) {
			 role=Role.DELIVERER;
		} 
		return role;
	}
	
	
	public Collection<User> filterUsersByType(String userType) {
		CustomerType type=checkCustomer(userType);
	    ArrayList<User> ret= new ArrayList<User>();
		
		for(User user : this.users.values()) {
			if(user.getTypeCustomer() !=null && user.getTypeCustomer().getType().equals(type) && !user.getDeleted() ) {	
				ret.add(user);
			}
		}
		
		return ret;
	}
	
	//sortiranje 
	public Collection<User> sortUsers(String type) {
		ArrayList<User> ret= new ArrayList<User>();
		for(User user : users.values()) {
			if(!user.getDeleted()) {
			ret.add(user);
		}
		}
		 if(type.equals("imeRastuce")) {
			 Collections.sort(ret, new Comparator<User>(){
				    public int compare(User s1, User s2) {
				        return s1.getName().compareToIgnoreCase(s2.getName());
				    }
				});
		 }
		 if(type.equals("imeOpadajuce")) {
			 Collections.sort(ret, new Comparator<User>(){
				    public int compare(User s1, User s2) {
				        return s2.getName().compareToIgnoreCase(s1.getName());
				    }
				});
		 }
		 if(type.equals("prezimeRastuce")) {
			 Collections.sort(ret, new Comparator<User>(){
				    public int compare(User s1, User s2) {
				        return s1.getSurname().compareToIgnoreCase(s2.getSurname());
				    }
				});
		 }
		 if(type.equals("korisnickoImeRastuce")) {
			 Collections.sort(ret, new Comparator<User>(){
				    public int compare(User s1, User s2) {
				        return s1.getUsername().compareToIgnoreCase(s2.getUsername());
				    }
				});
		 }

		 if(type.equals("prezimeOpadajuce")) {
			 Collections.sort(ret, new Comparator<User>(){
				    public int compare(User s1, User s2) {
				        return s2.getSurname().compareToIgnoreCase(s1.getSurname());
				    }
				});
		 }

		 if(type.equals("korisnickoImeOpadajuce")) {
			 Collections.sort(ret, new Comparator<User>(){
				    public int compare(User s1, User s2) {
				        return s2.getUsername().compareToIgnoreCase(s1.getUsername());
				    }
				});
		 }
		return ret;
	}


}
