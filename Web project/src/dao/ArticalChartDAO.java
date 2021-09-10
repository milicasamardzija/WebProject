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

import beans.ArticalChart;

public class ArticalChartDAO {
	
	private HashMap<Integer,ArticalChart> articals;

	public HashMap<Integer, ArticalChart> getArticals() {
		return articals;
	}

	public void setArticals(HashMap<Integer, ArticalChart> articals) {
		this.articals = articals;
	}
	
	
	public ArticalChartDAO() {
		this.setArticals(new HashMap<Integer, ArticalChart>());
		
		loadArticals();
	}
	
	//ucitavanje artikala iz fajla
	@SuppressWarnings("unchecked")
	private void loadArticals() {
		FileWriter fileWriter = null;
		BufferedReader in = null;
		File file = null;
		try {
			file = new File("WebContent/data/articalCharts.txt");
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
		File f = new File("WebContent/data/articalsChart.txt");
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
}
