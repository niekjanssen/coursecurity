# Coursecurity
IT Security Awareness training platform running on Docker using real tools and realistic targets, developed as part of the MSc in Software Design at the IT University of Copenhagen.

Citable as ```Dalgaard et al. (2023)```; as part of the proceedings of the Symposium on Usable Security and Privacy (USEC).

> Dalgaard, J.C., Janssen, N.A., Kulyuk, O. and Schürmann, C. (2023). "Security Awareness Training through Experiencing the Adversarial Mindset" _In Proceedings of the Workshop on Usable Security and Privacy 2023 (USEC23)_. [https://dx.doi.org/10.14722/usec.2023.237300](https://www.ndss-symposium.org/wp-content/uploads/2023/02/usec2023-237300-paper.pdf)

## Supplemental Material
* Source Code: As found on GitHub https://github.com/niekjanssen/ ([Non-Commercial License](https://github.com/niekjanssen/coursecurity/blob/main/LICENSE))
* Introductory Video shown to participants: On YouTube [youtu.be/r2zZiEuLD78](https://youtu.be/r2zZiEuLD78)
* Screenshots: As found in paper, and on [GitHub](https://github.com/niekjanssen/coursecurity/blob/main/Screenshots.md)
* Additional Graphs: Includes answer distribution and changes on question and construct level, On [GitHub](https://github.com/niekjanssen/coursecurity/blob/main/Results_Graphs.pdf)

## Running
This project requires Docker and Docker Compose.
The different containers are automatically built if required. Simply run 
```docker-compose up -d```

Once the project is running, access the platform on http://localhost:9070/
