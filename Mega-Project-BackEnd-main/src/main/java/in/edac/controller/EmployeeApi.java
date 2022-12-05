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
import in.edac.message.request.EmployeeForm;
import in.edac.model.Employee;
import in.edac.model.Project;
import in.edac.model.Role;
import in.edac.model.RoleName;
import in.edac.model.User;
import in.edac.repository.EmployeeRepository;
import in.edac.repository.ProjectRepository;
import in.edac.repository.UserRepository;
@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/v1/")

public class EmployeeApi {

	@Autowired
	private UserRepository userRepository;
	@Autowired
	private EmployeeRepository employeeRepository;
	
	@Autowired
	private ProjectRepository projectRepository;
    
	@GetMapping("/employee1")
	public List<Employee> getAllEmployees(){
		return employeeRepository.findAll();
	}		
	
	
	@PostMapping("/employee")
	public Employee createEmployee(@RequestBody EmployeeForm employee1, HttpServletRequest request) {
		Employee employee = new Employee();
		
		User us = userRepository.findByEmail(employee1.getUseremail());//(()-> new RuntimeException("Fail!-> Cause:Project not found."));
		employee.setUser(us);
		
		Project project = projectRepository.findByProjectName(employee1.getProjectname());//(()-> new RuntimeException("Fail!-> Cause:Project not found."));
		employee.setProject(project);
		
		
		Principal principal = request.getUserPrincipal();
		String name = principal.getName();
		if(name != null) {
			User teamLead = userRepository.findByUsername(name)
			.orElseThrow(() -> new RuntimeException("Fail! -> Cause: Project Lead not find."));
			employee.setTeamLead(teamLead);
		}
		return employeeRepository.save(employee);
	}
	
	@PutMapping("/employees/{id}")
	public ResponseEntity<Employee> updateEmployee(@PathVariable Long id, @RequestBody Employee employeeDetails){
		Employee employee = employeeRepository.findById(id)
			.orElseThrow(() -> new ResourceNotFoundException("Employee not exist with id :" + id));
	
		employee.setUser(employeeDetails.getUser());
		employee.setProject(employeeDetails.getProject());
		employee.setTeamLead(employeeDetails.getTeamLead());
		employee.setTaskId(employeeDetails.getTaskId());
		Employee updatedEmployee = employeeRepository.save(employee);
		return ResponseEntity.ok(updatedEmployee);
	}
	

	@DeleteMapping("/employees/{id}")
	public ResponseEntity<Map<String, Boolean>> deleteEmployee(@PathVariable Long id){
		Employee employee = employeeRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Employee not exist with id :" + id));
		
		employeeRepository.delete(employee);
		Map<String, Boolean> response = new HashMap<>();
		response.put("deleted", Boolean.TRUE);
		return ResponseEntity.ok(response);
	}


	  
	@GetMapping("/employee")
	public List<Employee> getEmployee(HttpServletRequest request){
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
				return employeeRepository.findAllBy(id);
			}
			else
			{
				return employeeRepository.findAll();
			}		
	}
}
