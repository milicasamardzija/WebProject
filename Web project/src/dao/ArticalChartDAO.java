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

import beans.Artical;
import beans.ArticalChart;
import beans.User;
import dto.ArticalChartsDTO;

public class ArticalChartDAO {
	
	@Context
	HttpServletRequest request;
	@Context
	ServletContext context;
	
	private HashMap<Integer,ArticalChart> articals;
	private RestaurantDAO restaurantDao;
	
	
	public HashMap<Integer, ArticalChart> getArticals() {
		return articals;
	}

	public void setArticals(HashMap<Integer, ArticalChart> articals) {
		this.articals = articals;
	}
	
	
	public ArticalChartDAO() {
		this.setArticals(new HashMap<Integer, ArticalChart>());
		this.restaurantDao = new RestaurantDAO();
		
		loadArticals();
	}
	
	//ucitavanje artikala iz fajla
	@SuppressWarnings("unchecked")
	private void loadArticals() {
		FileWriter fileWriter = null;
		BufferedReader in = null;
		File file = null;
		try {
			file = new File("WebContent/data/articalsCharts.txt");
			in = new BufferedReader(new FileReader(file));

			ObjectMapper objectMapper = new ObjectMapper();
			objectMapper.setVisibilityChecker(
					VisibilityChecker.Std.defaultInstance().withFieldVisibility(JsonAutoDetect.Visibility.ANY));
			TypeFactory factory = TypeFactory.defaultInstance();
			MapType type = factory.constructMapType(HashMap.class, Integer.class, ArticalChart.class);
			objectMapper.getFactory().configure(JsonGenerator.Feature.ESCAPE_NON_ASCII, true);
			this.articals = ((HashMap<Integer, ArticalChart>) objectMapper.readValue(file, type));
		} catch (FileNotFoundException fnfe) {
			try {
				file.createNewFile();
				fileWriter = new FileWriter(file);
				ObjectMapper objectMapper = new ObjectMapper();
				objectMapper.configure(SerializationFeature.INDENT_OUTPUT, true);
				objectMapper.getFactory().configure(JsonGenerator.Feature.ESCAPE_NON_ASCII, true);
				String string = objectMapper.writeValueAsString(articals);
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
	

	public Collection<ArticalChart> getValues() {
		return this.articals.values();
	}

	public ArticalChart getByID(int articalId) {
		for (ArticalChart artical : this.articals.values()) {
			if(artical.getIdArtical() == articalId) {
				return artical;
			}
		}
		return null;
	}
	
	
	//ucitavanje artikala u fajl
	private void saveArticals() {
		File f = new File("WebContent/data/articalsCharts.txt");
		FileWriter fileWriter = null;
		try {
			fileWriter = new FileWriter(f);
			ObjectMapper objectMapper = new ObjectMapper();
			objectMapper.configure(SerializationFeature.INDENT_OUTPUT, true);
			objectMapper.getFactory().configure(JsonGenerator.Feature.ESCAPE_NON_ASCII, true);
			String stringRestaurants = objectMapper.writeValueAsString(this.articals);
			fileWriter.write(stringRestaurants);
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
	
	private int generateIdArticalChart() {
		int ret = 0;
        for (ArticalChart articalBig : this.getValues())
        {
            for (ArticalChart artical : this.getValues())
            {
                if (ret == artical.getIdArtical())
                {
                    ++ret;
                    break;
                }
            }
        }
        return ret;
	}

	public void addNew(Artical artical, User user) {
		ArrayList<ArticalChartsDTO> chartsArticals = this.getArticalsForChart(user);
		ArticalChart newArtical = new ArticalChart(artical.getId(), artical.getNumber(),user.getUsername(),artical.getId(), artical.getIdRestaurant(), this.restaurantDao.getByID(artical.getIdRestaurant()).getType());
		if(chartsArticals.size() == 0) {
			this.articals.put(artical.getId(),newArtical);
		}else {
			for (ArticalChart articalChart : this.getValues()) {
				if (articalChart.getIdRestaurant() == artical.getIdRestaurant()) {
					this.articals.put(artical.getId(),newArtical);
					break;
				} else {
					return;
				}
			}
		}		
		
		this.articals.put(artical.getId(),newArtical);
		this.saveArticals();
	}

	public ArrayList<ArticalChartsDTO> getArticalsForChart(User user) {
		ArrayList<ArticalChartsDTO> ret = new ArrayList<ArticalChartsDTO>();
		 
			for (ArticalChart articalChart : this.getValues()) {
				Artical artical = getArtical(articalChart.getIdArtical());
				if(articalChart.getIdCustomer().equals(user.getUsername()) && articalChart.getQuantity() > 0) {
					ret.add(new ArticalChartsDTO(artical.getId(),artical.getLink(),artical.getName(), artical.getPrice(), articalChart.getQuantity(), articalChart.getIdRestaurant(), articalChart.getRestaurantType(), articalChart.getIdArticalInRestaurant()));
				}
			}
			
		return ret;		 
	
	}
	
	//za konkretnog usera citavu korpu da brise 
	public void deleteArticalsFromChart(User user) {
			for (ArticalChart articalChart : this.getValues()) {
				Artical artical = getArtical(articalChart.getIdArtical());
				if(articalChart.getIdCustomer().equals(user.getUsername())) {
					System.out.println("Ime artikla " + articalChart.getIdArtical());
					this.getValues().remove(articalChart);
				}
			}
		
	}

	
	
	public void deleteArticalById(int id) {
		ArticalChart artical = getByID(id);
		if(artical != null) {
			this.getValues().remove(artical);
			this.saveArticals();
		}
	}
	
	public Artical getArtical(int id) {
		ArticalDAO articalDAO = new ArticalDAO();
		return articalDAO.getByID(id);
	}
	
	private ArticalDAO getArticalDAO() {
		ArticalDAO articals = (ArticalDAO)context.getAttribute("articals");
		
		if (articals == null) {
			articals = new ArticalDAO();
			context.setAttribute("articals", articals);
		}
	
		return articals;
	}

	public ArrayList<ArticalChartsDTO> plus(int parseInt, User user) {
		ArrayList<ArticalChartsDTO> ret= new ArrayList<ArticalChartsDTO>();
		Artical artical= getArtical(parseInt);
		for(ArticalChart a: this.getValues()) {
			if(a.getIdArtical() == parseInt && a.getIdCustomer().equals(user.getUsername())) {
				a.setQuantity(a.getQuantity()+1);
			}
		}
		saveArticals();
		
		return this.getArticalsForChart(user);
	}

	//RADI
	public ArrayList<ArticalChartsDTO> minus(int parseInt, User user) {
		ArrayList<ArticalChartsDTO> ret= new ArrayList<ArticalChartsDTO>();
		Artical artical= getArtical(parseInt);
		for(ArticalChart a: this.getValues()) {
			//ako ima vise od jedan 
			if(a.getIdArtical() == parseInt && a.getIdCustomer().equals(user.getUsername()) && a.getQuantity() > 1 ) {
				System.out.println("Kolicina nakon smanjivanja " + a.getQuantity());
					a.setQuantity(a.getQuantity()-1);
					System.out.println("Kolicina nakon smanjivanja " + a.getQuantity());
					break;
				
			}
			else if(a.getIdArtical() == parseInt && a.getIdCustomer().equals(user.getUsername()) && a.getQuantity() == 1){
				System.out.println("DRUGA METODA KAD JE JEDAN ");
				this.getValues().remove(a);

				break;
			}
		}
		
		/*for(ArticalChart a: this.getValues()) {
			if(a.getIdArtical() == parseInt && a.getIdCustomer().equals(user.getUsername()) && a.getQuantity() == 1) {
				
					this.getValues().remove(a);
					break;
			
			} 
		}
		*/
		saveArticals();
		
		return this.getArticalsForChart(user);
	}

	
}
