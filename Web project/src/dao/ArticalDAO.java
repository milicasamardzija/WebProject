package dao;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
import java.util.Collection;
import java.util.HashMap;

import com.fasterxml.jackson.annotation.JsonAutoDetect;
import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;
import com.fasterxml.jackson.databind.introspect.VisibilityChecker;
import com.fasterxml.jackson.databind.type.MapType;
import com.fasterxml.jackson.databind.type.TypeFactory;

import beans.Address;
import beans.Artical;
import beans.Restaurant;
import dto.ArticalChangeDTO;
import dto.ArticalDTO;

public class ArticalDAO {

	private HashMap<Integer,Artical> articals;

	public HashMap<Integer, Artical> getArticals() {
		return articals;
	}

	public void setArticals(HashMap<Integer, Artical> articals) {
		this.articals = articals;
	}
	
	
	public ArticalDAO() {
		this.setArticals(new HashMap<Integer, Artical>());
		
		loadArticals();
	}
	
	//ucitavanje artikala iz fajla
	@SuppressWarnings("unchecked")
	private void loadArticals() {
		FileWriter fileWriter = null;
		BufferedReader in = null;
		File file = null;
		try {
			file = new File("WebContent/data/articals.txt");
			in = new BufferedReader(new FileReader(file));

			ObjectMapper objectMapper = new ObjectMapper();
			objectMapper.setVisibilityChecker(
					VisibilityChecker.Std.defaultInstance().withFieldVisibility(JsonAutoDetect.Visibility.ANY));
			TypeFactory factory = TypeFactory.defaultInstance();
			MapType type = factory.constructMapType(HashMap.class, Integer.class, Artical.class);
			objectMapper.getFactory().configure(JsonGenerator.Feature.ESCAPE_NON_ASCII, true);
			this.articals = ((HashMap<Integer, Artical>) objectMapper.readValue(file, type));
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
	

	public Collection<Artical> getValues() {
		return this.articals.values();
	}

	public Artical getByID(int articalId) {
		for (Artical artical : this.articals.values()) {
			if(artical.getId() == articalId) {
				return artical;
			}
		}
		return null;
	}
	
	
	//ucitavanje artikala u fajl
	private void saveArticals() {
		File f = new File("WebContent/data/articals.txt");
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
	
	private int generateIdArtical() {
		int ret = 0;
        for (Artical articalBig : this.getValues())
        {
            for (Artical artical : this.getValues())
            {
                if (ret == artical.getId())
                {
                    ++ret;
                    break;
                }
            }
        }
        return ret;
	}

	public ArticalDTO addArtical(ArticalDTO artical) {
		
		for (Artical a : this.getValues()) {
			if (a.getName().equals(artical.name)){
				return null;
			}
		}
		int id = generateIdArtical();
		this.articals.put(id, new Artical(id, artical.name, artical.price, artical.type, artical.idRestaurant,artical.quantity, artical.description, generateLink(artical.link),false, 0));
		this.saveArticals();
		return artical;
	}

	private String generateLink(String link) {
		String ret="";
		//C:\fakepath\20180717_155517.jpg
		String path[] = link.split("fakepath");
		ret = path[1].substring(1);
		
		return ret;
	}

	public void changeArtical(ArticalChangeDTO artical) {
		Artical articalChange = getByID(artical.id);
		articalChange.setName(artical.name);
		articalChange.setType(artical.type);
		articalChange.setLink(generateLink(artical.link));
		articalChange.setDescription(artical.description);
		articalChange.setPrice(artical.price);
		articalChange.setQuantity(artical.quantity);
		saveArticals();
	}
}
