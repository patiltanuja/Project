package in.edac.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import in.edac.exception.ResourceNotFoundException;
import in.edac.message.request.LoginForm;
import in.edac.message.request.SignUpForm;
import in.edac.message.response.JwtResponse;
import in.edac.message.response.ResponseMessage;
import in.edac.model.Project;
import in.edac.model.Role;
import in.edac.model.RoleName;
import in.edac.model.User;
import in.edac.security.jwt.JwtProvider;
import in.edac.repository.UserRepository;
import in.edac.repository.ProjectRepository;
import in.edac.repository.RoleRepository;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/auth")
public class AuthRestAPIs {

	@Autowired
	AuthenticationManager authenticationManager;

	@Autowired
	UserRepository userRepository;

	@Autowired
	RoleRepository roleRepository;
	
	@Autowired
	ProjectRepository projectRepository;

	@Autowired
	PasswordEncoder encoder;
	
	@Autowired
	EmailSenderService emailSenderService;

	@Autowired
	JwtProvider jwtProvider;

	@PostMapping("/signin")
	public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginForm loginRequest) {

		Authentication authentication = authenticationManager.authenticate(
				new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword()));

		SecurityContextHolder.getContext().setAuthentication(authentication);

		String jwt = jwtProvider.generateJwtToken(authentication);
		UserDetails userDetails = (UserDetails) authentication.getPrincipal();

		return ResponseEntity.ok(new JwtResponse(jwt, userDetails.getUsername(), userDetails.getAuthorities()));
	}

	@GetMapping("/employees")
	public List<User> getAllEmployees(){
		return userRepository.findAll();
	}
	
	@GetMapping("/roles")
	public List<Role> getAllRoles(){
		return roleRepository.findAll();
	}
	
	@PostMapping("/project")
	public Project addProject(@RequestBody Project project) {
		return projectRepository.save(project);
	}  
	/*
	//create employee rest api
	@PostMapping("/employees")
	 public User createEmployee(@RequestBody User employee)
	 {
		 return userRepository.save(employee);
	 }*/
	
	//get employee by id rest api
	@GetMapping("/employees/{id}")
	public ResponseEntity <User> getEmployeeById(@PathVariable Long id) {
		User employee=userRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Employee Does Not Exist"));
		
		return ResponseEntity.ok(employee);
    }
	
	//update employee rest api
	@PutMapping("/employees/{id}")
	public ResponseEntity<User> updateEmployee(@PathVariable Long id, @RequestBody SignUpForm employeeDetails){
		
			User employee = userRepository.findById(id)
					.orElseThrow(() -> new ResourceNotFoundException("Employee Does Not Exist"));
			
			employee.setFirstname(employeeDetails.getFirstname());
			employee.setLastname(employeeDetails.getLastname());
			employee.setUsername(employeeDetails.getLastname());
			employee.setMobileno(employeeDetails.getMobileno());
			employee.setEmail(employeeDetails.getEmail());
			Role role= roleRepository.findByName(RoleName.valueOf(employeeDetails.getRole()))
			.orElseThrow(() -> new RuntimeException("Fail! -> Cause: User Role not find."));
			
			employee.setRole(role);
			
			User updatedEmployee=userRepository.save(employee);
			return ResponseEntity.ok(updatedEmployee);
	}
	
	@DeleteMapping("delete/{id}")
	public ResponseEntity<Map<String, Boolean>> deleteEmployee(@PathVariable Long id){
		User user = userRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Employee Does Not Exist"));
		
		userRepository.delete(user);
        Map < String, Boolean > response = new HashMap < > ();
        response.put("deleted", Boolean.TRUE);
        return ResponseEntity.ok(response);	
	}	
	
	
	@PostMapping("/signup")
	public ResponseEntity<?> registerUser(@Valid @RequestBody SignUpForm signUpRequest) {
		
		emailSenderService.sendSimpleEmail(signUpRequest.getEmail(), "Thank You " + signUpRequest.getFirstname()
		+ " For join with us..  You have successfully registered with Kanban.. You can sign in  with following credentials "
		+ "  Username: " + signUpRequest.getFirstname()+ "   Password: " + signUpRequest.getPassword(), "Registration Successfull...!!!");

		
		if (userRepository.existsByUsername(signUpRequest.getUsername())) {
			return new ResponseEntity<>(new ResponseMessage("Fail -> Username is already taken!"),
					HttpStatus.BAD_REQUEST);
		}

		if (userRepository.existsByEmail(signUpRequest.getEmail())) {
			return new ResponseEntity<>(new ResponseMessage("Fail -> Email is already in use!"),
					HttpStatus.BAD_REQUEST);
		}

		// Creating user's account
		User user = new User(signUpRequest.getFirstname(), signUpRequest.getLastname(), 
								signUpRequest.getUsername(), signUpRequest.getEmail(),signUpRequest.getMobileno(),
				encoder.encode(signUpRequest.getPassword()));

		//Set<Role> roles = new HashSet<>();
		Role role = null;
		if(signUpRequest.getRole() != null) {
			String roleName = signUpRequest.getRole();

				switch (roleName) {
				case "admin":
					role = roleRepository.findByName(RoleName.ROLE_ADMIN)
							.orElseThrow(() -> new RuntimeException("Fail! -> Cause: User Role not find."));

					break;
				case "pm":
					role = roleRepository.findByName(RoleName.ROLE_PM)
							.orElseThrow(() -> new RuntimeException("Fail! -> Cause: User Role not find."));

					break;
				default:
					role = roleRepository.findByName(RoleName.ROLE_USER)
							.orElseThrow(() -> new RuntimeException("Fail! -> Cause: User Role not find."));
				}
		} else {
			// default mode : User register 
			role = roleRepository.findByName(RoleName.ROLE_USER)
					.orElseThrow(() -> new RuntimeException("Fail! -> Cause: User Role not find."));
		}
		
		user.setRole(role);
		userRepository.save(user);

		return new ResponseEntity<>(new ResponseMessage("User "+ signUpRequest.getFirstname() + " is registered successfully!"), HttpStatus.OK);
	}
}

