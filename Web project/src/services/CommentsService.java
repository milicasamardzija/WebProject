package services;

import java.util.ArrayList;
import java.util.Collection;

import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletRequest;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;


import beans.Comment;
import beans.User;
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
			ret.add(new CommentDTO(comment.getId(),restaurantsDAO.getByID(comment.getRestaurantId()).getName(),comment.getCustomerId(),comment.getText(), comment.getGrade()));
		}
		
		return ret;
	}
	
	@POST
	@Path("/getCommentsForRestaurant")
	@Produces(MediaType.APPLICATION_JSON)
	public Collection<CommentDTO> getAllCommentsRestaurant(String idRestaurant) {
		ArrayList<CommentDTO> ret = new ArrayList<CommentDTO>();
		CommentsDAO commentsDAO = getCommentsDAO();
		RestaurantDAO restaurantsDAO = getRestaurantsDAO();
		Collection<Comment> comments =  commentsDAO.getValues();
		
		for (Comment comment : comments) {
			if (comment.getRestaurantId() == Integer.parseInt(idRestaurant) && comment.getApproved()) {
				ret.add(new CommentDTO(comment.getId(),restaurantsDAO.getByID(comment.getRestaurantId()).getName(),comment.getCustomerId(),comment.getText(), comment.getGrade()));
			}
		}
		
		return ret;
	}
	
	@GET
	@Path("/getAllCommentsManager")
	@Produces(MediaType.APPLICATION_JSON)
	public Collection<CommentDTO> getAllCommentsManager() {
		ArrayList<CommentDTO> ret = new ArrayList<CommentDTO>();
		CommentsDAO commentsDAO = getCommentsDAO();
		RestaurantDAO restaurantsDAO = getRestaurantsDAO();
		Collection<Comment> comments =  commentsDAO.getValues();
		User user = (User)request.getSession().getAttribute("loginUser");	
		
		for (Comment comment : comments) {
			if (comment.getRestaurantId() == user.getIdRestaurant()) {
				ret.add(new CommentDTO(comment.getId(),restaurantsDAO.getByID(comment.getRestaurantId()).getName(),comment.getCustomerId(),comment.getText(), comment.getGrade(),comment.getApproved()));
			}
		}
		
		return ret;
	}
	
	@POST
	@Path("/approveComment")
	@Produces(MediaType.APPLICATION_JSON)
	public Collection<Comment> approveComment(String idComment) {
		CommentsDAO commentsDAO = getCommentsDAO();
		return commentsDAO.approveComment(idComment);
		
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
