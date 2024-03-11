package com.CrewSchedulerPro.Back.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.CrewSchedulerPro.Back.Model.CrewmanLogIn;
import java.util.Optional;

public interface CrewmanLogInRepository extends JpaRepository<CrewmanLogIn, Long> {
    Optional<CrewmanLogIn> findByUsernameAndPassword(String username, String password);
}
