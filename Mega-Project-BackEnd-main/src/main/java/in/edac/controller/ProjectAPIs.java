package in.edac.controller;

import java.security.Principal;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import in.edac.exception.ResourceNotFoundException;
import in.edac.model.Employee;
import in.edac.model.Project;
import in.edac.model.Role;
import in.edac.model.User;
import in.edac.repository.ProjectRepository;
import in.edac.repository.UserRepository;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/v1/")

public class ProjectAPIs {
	@Autowired
	private ProjectRepository projectRepository;
	
	@Autowired
	private UserRepository userRepository;
    
	@GetMapping("/project")
	public List<Project> getAllProject(){
		return projectRepository.findAll();
	}	
	@PostMapping("/project")
	public Project createProject(@RequestBody Project project, HttpServletRequest request) {
		Principal principal = request.getUserPrincipal();
		String name = principal.getName();
		if(name != null) {
			User user = userRepository.findByUsername(name)
			.orElseThrow(() -> new RuntimeException("Fail! -> Cause: User not find."));
			project.setTeamLead(user);
		}
		return projectRepository.save(project);
	}
	@DeleteMapping("/project/{id}")
	public ResponseEntity<Map<String,Boolean>> deleteProject(@PathVariable Long id){
		Project project=projectRepository.findById(id)
				.orElseThrow(()-> new ResourceNotFoundException("Project not exist with id"+ id));
		
	projectRepository.delete(project);
	Map<String,Boolean> response = new HashMap<>();
	response.put("deleted",Boolean.TRUE);
	return ResponseEntity.ok(response);
	}
	@PutMapping("/project/{id}")
	public ResponseEntity<Project> updateProject(@PathVariable Long id, @RequestBody Project projectDetails){
		
		Project project =projectRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Project Does Not Exist"));
		
		
		project.setEmployee(projectDetails.getEmployee());
		project.setTask(projectDetails.getTask());
		project.setProjectName(projectDetails.getProjectName());
		project.setTeamLead(projectDetails.getTeamLead());
		
		Project updatedProject = projectRepository.save(project);
		return ResponseEntity.ok(updatedProject);
}
	
	@GetMapping("/project1")
	public List<Project> getProject(HttpServletRequest request){
		Principal principal = request.getUserPrincipal();
		String name = principal.getName();
			User user = userRepository.findByUsername(name)
			 .orElseThrow(() -> new RuntimeException("Fail! -> Cause: User not find."));
			
			Role role = null;
			String roleName =user.getRole().getName().toString();
			String Role="ROLE_PM";
			if(roleName==Role)
			{
				Long id=user.getId();
				return projectRepository.findAllBy(id);
			}
			else
			{
				return projectRepository.findAll();
			}		
	}
}
