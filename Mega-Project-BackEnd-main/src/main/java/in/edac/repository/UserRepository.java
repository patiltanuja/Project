package in.edac.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import in.edac.model.User;

@Repository
public interface UserRepository extends JpaRepository <User,Long>{
	Optional<User> findByUsername(String username);
	User findByEmail(String email);
    Boolean existsByUsername(String username);
    Boolean existsByEmail(String email);
}
