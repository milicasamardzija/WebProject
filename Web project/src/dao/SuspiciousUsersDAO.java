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

import beans.Restaurant;
import beans.SuspiciousUsers;
import beans.User;
import dto.UserSearchDTO;

public class SuspiciousUsersDAO {
	
	private HashMap<Integer, SuspiciousUsers> users;
	private String filePath = "";

	public Collection<SuspiciousUsers> getValues() {
		return users.values();
	}
	
	public HashMap<Integer, SuspiciousUsers> getUsers() {
		return users;
	}

	public void setUsers(HashMap<Integer, SuspiciousUsers> users) {
		this.users = users;
	}

	public String getFilePath() {
		return filePath;
	}

	public void setFilePath(String filePath) {
		this.filePath = filePath;
	}

	public SuspiciousUsersDAO(HashMap<Integer, SuspiciousUsers> users, String filePath) {
		super();
		this.users = users;
		this.filePath = filePath;
	}
	
	public SuspiciousUsersDAO(String contextPath) {
		this.setUsers(new HashMap<Integer, SuspiciousUsers>());
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
				file = new File("WebContent/data/suspeciousUsers.txt");
				in = new BufferedReader(new FileReader(file));

				ObjectMapper objectMapper = new ObjectMapper();
				objectMapper.setVisibilityChecker(
						VisibilityChecker.Std.defaultInstance().withFieldVisibility(JsonAutoDetect.Visibility.ANY));
				TypeFactory factory = TypeFactory.defaultInstance();
				MapType type = factory.constructMapType(HashMap.class, String.class, SuspiciousUsers.class);
				objectMapper.getFactory().configure(JsonGenerator.Feature.ESCAPE_NON_ASCII, true);
				this.users = ((HashMap<Integer, SuspiciousUsers>) objectMapper.readValue(file, type));
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
		public void saveUsers() {
			File f = new File("WebContent/data/suspeciousUsers.txt");
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
		
		private int generateId() {
			int ret = 0;
	        for (SuspiciousUsers sB : this.getValues())
	        {
	            for (SuspiciousUsers s : this.getValues())
	            {
	                if (ret == s.getId())
	                {
	                    ++ret;
	                    break;
	                }
	            }
	        }
	        return ret;
		}

		public void addNew(SuspiciousUsers suspiciousUser) {
			int id = generateId();
			suspiciousUser.setId(id);
			this.users.put(id, suspiciousUser);
			saveUsers();
		}
		
	
		
}
