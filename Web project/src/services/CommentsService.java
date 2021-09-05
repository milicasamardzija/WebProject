package services;

import java.util.ArrayList;
import java.util.Collection;

import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletRequest;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;

import beans.Comment;
import dao.CommentsDAO;
import dao.RestaurantDAO;
import dto.CommentDTO;


@Path("/comments")
public class CommentsService {
	@Context
	HttpServletRequest request;
	@Context
	ServletContext context;
	
	public CommentsService() {
		
	}
	
	@GET
	@Path("/getAllComments")
	@Produces(MediaType.APPLICATION_JSON)
	public Collection<CommentDTO> getAll() {
		ArrayList<CommentDTO> ret = new ArrayList<CommentDTO>();
		CommentsDAO commentsDAO = getCommentsDAO();
		RestaurantDAO restaurantsDAO = getRestaurantsDAO();
		Collection<Comment> comments =  commentsDAO.getValues();
		
		for (Comment comment : comments) {
			System.out.println(comment.getId());
			System.out.println(restaurantsDAO.getByID(comment.getRestaurantId()).getName());
			System.out.println(comment.getCustomerId());
			System.out.println(comment.getText());
			System.out.println(comment.getGrade());
			ret.add(new CommentDTO(comment.getId(),restaurantsDAO.getByID(comment.getRestaurantId()).getName(),comment.getCustomerId(),comment.getText(), comment.getGrade()));
		}
		
		return ret;
	}
	
	private CommentsDAO getCommentsDAO() {
		CommentsDAO comments = (CommentsDAO)context.getAttribute("comments");
		
		if (comments == null) {
			comments = new CommentsDAO();
			context.setAttribute("comments", comments);
		}
	
		return comments;
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
