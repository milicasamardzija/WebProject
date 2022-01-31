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

import com.fasterxml.jackson.annotation.JsonAutoDetect;
import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;
import com.fasterxml.jackson.databind.introspect.VisibilityChecker;
import com.fasterxml.jackson.databind.type.MapType;
import com.fasterxml.jackson.databind.type.TypeFactory;

import beans.Artical;
import beans.Comment;

public class CommentsDAO {
	private HashMap<Integer,Comment> comments;

	public HashMap<Integer, Comment> getComments() {
		return comments;
	}

	public void setComments(HashMap<Integer, Comment> comments) {
		this.comments = comments;
	}
	
	
	public CommentsDAO() {
		this.setComments(new HashMap<Integer, Comment>());
		
		loadComments();
	}
	
	//ucitavanje kometara iz fajla
	@SuppressWarnings("unchecked")
	private void loadComments() {
		FileWriter fileWriter = null;
		BufferedReader in = null;
		File file = null;
		try {
			file = new File("WebContent/data/comments.txt");
			in = new BufferedReader(new FileReader(file));

			ObjectMapper objectMapper = new ObjectMapper();
			objectMapper.setVisibilityChecker(
					VisibilityChecker.Std.defaultInstance().withFieldVisibility(JsonAutoDetect.Visibility.ANY));
			TypeFactory factory = TypeFactory.defaultInstance();
			MapType type = factory.constructMapType(HashMap.class, Integer.class, Comment.class);
			objectMapper.getFactory().configure(JsonGenerator.Feature.ESCAPE_NON_ASCII, true);
			this.comments = ((HashMap<Integer, Comment>) objectMapper.readValue(file, type));
		} catch (FileNotFoundException fnfe) {
			try {
				file.createNewFile();
				fileWriter = new FileWriter(file);
				ObjectMapper objectMapper = new ObjectMapper();
				objectMapper.configure(SerializationFeature.INDENT_OUTPUT, true);
				objectMapper.getFactory().configure(JsonGenerator.Feature.ESCAPE_NON_ASCII, true);
				String stringUsers = objectMapper.writeValueAsString(comments);
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
	public void saveComments() {
		File f = new File("WebContent/data/comments.txt");
		FileWriter fileWriter = null;
		try {
			fileWriter = new FileWriter(f);
			ObjectMapper objectMapper = new ObjectMapper();
			objectMapper.configure(SerializationFeature.INDENT_OUTPUT, true);
			objectMapper.getFactory().configure(JsonGenerator.Feature.ESCAPE_NON_ASCII, true);
			String string= objectMapper.writeValueAsString(this.comments);
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

	public Collection<Comment> getValues() {
		return this.comments.values();
	}


	public void approveComment(String idComment) {
           Collection<Comment> comments =  this.getValues();
           Collection<Comment> ret =  new ArrayList<Comment>();
           
			for (Comment comment : comments) {
				if (comment.getId() == Integer.parseInt(idComment)) {
					comment.setApproved(true);
				}
			}
			this.saveComments();
	}
	
	private int generateId() {
		int ret = 0;
        for (Comment commentBig : this.getValues())
        {
            for (Comment comment : this.getValues())
            {
                if (ret == comment.getId())
                {
                    ++ret;
                    break;
                }
            }
        }
        return ret;
	}
	
	public void addNewComment(Comment comment) {
		int id = this.generateId();
		this.comments.put(id, new Comment(id, comment.getCustomerId(), comment.getRestaurantId(), comment.getText(), comment.getGrade(), false));
		this.saveComments();
	}

}
